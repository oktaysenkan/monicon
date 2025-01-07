import { stringToIcon } from "@iconify/utils/lib/icon/name";
import { loadCollectionFromFS } from "@iconify/utils/lib/loader/fs";
import { loadNodeIcon } from "@iconify/utils/lib/loader/node-loader";
import type { Loader } from "@monicon/loader";
import fs from "fs";
import path from "path";
import { parseSync } from "svgson";
import * as f from "fuuu";

import { toPx } from "./utils";

export type MoniconOptions = {
  /**
   * The names of the icons to load.
   *
   * The icon names should be in the format `collection:icon-name`.
   *
   * For example, `mdi:home`.
   *
   * You can explore available icons at https://icones.js.org
   */
  icons?: string[];
  /**
   * The names of the collections to load. All icons from the collections will be loaded.
   *
   * For example, `mdi`.
   *
   * You can explore available collections at https://icones.js.org
   */
  collections?: string[];
  /**
   * Custom collections to load icons from different sources.
   */
  customCollections?: Record<string, ReturnType<Loader>>;
  /**
   * The name of the file to output the icons to. The file extension will be added automatically based on the type.
   *
   * @default "icons"
   */
  outputFileName?: string;
  /**
   * The type of output file to generate.
   *
   * - `cjs` - CommonJS module
   *
   * - `esm` - ECMAScript module
   *
   * Details: https://monicon-docs.vercel.app/troubleshooting/module-resolution
   */
  type?: "cjs" | "esm";
  /**
   * The root directory of the project.
   *
   * @default process.cwd()
   */
  root?: string;
  /**
   * Whether to generate the types file.
   *
   * @default true
   */
  generateTypes?: boolean;
  /**
   * The name of the file to output the types to.
   *
   * @default "types.d.ts"
   */
  typesFileName?: string;
};

export type Icon = {
  svg: string;
  width: number;
  height: number;
};

const defaultOptions: Required<MoniconOptions> = {
  outputFileName: "icons",
  type: "esm",
  icons: [],
  collections: [],
  customCollections: {},
  root: process.cwd(),
  generateTypes: true,
  typesFileName: "types.d.ts",
};

export const getResolveAlias = () => {
  return "@monicon/runtime";
};

export const getResolveExtensions = () => {
  return [".js", ".mjs"];
};

const getAutoGeneratedPath = (root: string) => {
  const autoGeneratedPath = path.resolve(root, ".monicon");

  if (!fs.existsSync(autoGeneratedPath)) {
    fs.mkdirSync(autoGeneratedPath, { recursive: true });
  }

  return autoGeneratedPath;
};

export const getIconsFilePath = (opts?: MoniconOptions) => {
  const options: Required<MoniconOptions> = { ...defaultOptions, ...opts };

  const autoGeneratedPath = getAutoGeneratedPath(options.root);

  const extension = options.type === "cjs" ? "js" : "mjs";

  return path.resolve(
    autoGeneratedPath,
    `${options.outputFileName}.${extension}`
  );
};

const getTypesFilePath = (opts?: MoniconOptions) => {
  const options: Required<MoniconOptions> = { ...defaultOptions, ...opts };

  const autoGeneratedPath = getAutoGeneratedPath(options.root);

  return path.resolve(autoGeneratedPath, options.typesFileName);
};

export const transformIcon = (svg: string) => {
  const svgObject = parseSync(svg);

  const width = toPx(svgObject.attributes.width ?? "1em");
  const height = toPx(svgObject.attributes.height ?? "1em");

  return {
    svg,
    width: width,
    height: height,
  } satisfies Icon;
};

export const loadIcon = async (iconName: string) => {
  const iconDetails = stringToIcon(iconName);

  if (!iconDetails) {
    console.warn(
      `[Monicon] The icon "${iconName}" was not found. This icon might not exist, or the required icon collection might not be installed. You can explore available icons at https://icones.js.org and ensure the correct collection is added to your project.`
    );
    return;
  }

  let svg = await loadNodeIcon(iconDetails.prefix, iconDetails.name);

  if (!svg) {
    console.warn(
      `[Monicon] The icon "${iconName}" was not found. This icon might not exist, or the required icon collection might not be installed. You can explore available icons at https://icones.js.org and ensure the correct collection is added to your project.`
    );
    return;
  }

  const transformedIcon = f.syncSafe(() => transformIcon(svg));

  if (transformedIcon.error) {
    console.warn(
      `[Monicon] The icon "${iconName}" could not be transformed. This icon might not be in the correct format.`
    );
    return;
  }

  return transformedIcon.data;
};

const getIconsFromCollection = async (collectionName: string) => {
  const collection = await loadCollectionFromFS(collectionName);

  const icons = collection?.icons;

  if (!icons) {
    console.warn(
      `[Monicon] The collection "${collectionName}" was not found. This collection might not exist, or the required icon collection might not be installed. You can explore available icons at https://icones.js.org and ensure the correct collection is added to your project.`
    );
    return [];
  }

  const iconNames = Object.keys(icons).map(
    (iconName) => `${collectionName}:${iconName}`
  );

  return iconNames;
};

export const loadIcons = async (opts?: MoniconOptions) => {
  const options: Required<MoniconOptions> = {
    ...defaultOptions,
    ...opts,
  };

  const loadedIcons: Record<string, Icon> = {};

  for await (const collection of options.collections) {
    const collectionIcons = await getIconsFromCollection(collection);

    options.icons.push(...collectionIcons);
  }

  for await (const iconName of options.icons) {
    const icon = await loadIcon(iconName);

    if (!icon) continue;

    loadedIcons[iconName] = icon;
  }

  const loaders = Object.entries(options.customCollections);

  for await (const [loaderName, loader] of loaders) {
    const loaderResult = await loader();

    for await (const [iconName, svg] of Object.entries(loaderResult)) {
      const icon = transformIcon(svg);

      const name = `${loaderName}:${iconName}`;

      loadedIcons[name] = icon;
    }
  }

  const outputPath = getIconsFilePath(options);

  writeIcons(loadedIcons, outputPath, options.type);

  if (options.generateTypes) {
    const typesOutputPath = getTypesFilePath(options);

    const iconNames = Object.keys(loadedIcons);

    writeTypes(iconNames, typesOutputPath);
  }

  return loadedIcons;
};

const writeTypes = (iconNames: string[], outputPath: string) => {
  const iconNamesAsCode = iconNames.map((name) => `\n\t| "${name}"`).join("");

  const code = `// This file is automatically generated by Monicon. Do not edit this file directly.
import "@monicon/icon-loader";

declare module "@monicon/icon-loader" {
  export type MoniconIconName = ${iconNamesAsCode};

  export type MoniconProps = {
    name: MoniconIconName;
    size?: number;
    color?: string;
    strokeWidth?: number;
  };
}
`;

  fs.writeFileSync(outputPath, code);
};

const writeIcons = (
  icons: Record<string, Icon>,
  outputPath: string,
  type: MoniconOptions["type"] = "cjs"
) => {
  const header =
    "// This file is automatically generated by Monicon. Do not edit this file directly.";

  const commonjsCode = `${header}
module.exports = ${JSON.stringify(icons, null, 2)};`;

  const esmCode = `${header}
export default ${JSON.stringify(icons, null, 2)};`;

  fs.writeFileSync(outputPath, type === "cjs" ? commonjsCode : esmCode);
};
