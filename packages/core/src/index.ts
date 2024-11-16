import { stringToIcon } from "@iconify/utils/lib/icon/name";
import { loadCollectionFromFS } from "@iconify/utils/lib/loader/fs";
import { loadNodeIcon } from "@iconify/utils/lib/loader/node-loader";
import type { Loader } from "@monicon/loader";
import fs from "fs";
import path, { dirname } from "path";
import { parseSync } from "svgson";
import { fileURLToPath } from "url";

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
};

export type Icon = {
  svg: string;
  width: number;
  height: number;
};

const defaultOptions: Required<MoniconOptions> = {
  outputFileName: "icons",
  type: "cjs",
  icons: [],
  collections: [],
  customCollections: {},
};

export const getResolveAlias = () => {
  return "@monicon/runtime";
};

export const getResolveExtensions = () => {
  return [".js", ".mjs"];
};

const getIconsFilePathEsm = (
  fileName: MoniconOptions["outputFileName"] = "icons"
) => {
  // @ts-ignore
  const currentFileName = fileURLToPath(import.meta.url);
  const directory = dirname(currentFileName);

  return path.resolve(directory, `${fileName}.mjs`);
};

const getIconsFilePathCjs = (
  fileName: MoniconOptions["outputFileName"] = "icons"
) => {
  return path.resolve(__dirname, `${fileName}.js`);
};

export const getIconsFilePath = (opts?: MoniconOptions) => {
  const options: MoniconOptions = { ...defaultOptions, ...opts };

  if (options.type === "esm")
    return getIconsFilePathEsm(options.outputFileName);

  return getIconsFilePathCjs(options.outputFileName);
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

  return transformIcon(svg);
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
};

const writeIcons = (
  icons: Record<string, Icon>,
  outputPath: string,
  type: MoniconOptions["type"] = "cjs"
) => {
  const commonjsCode = `module.exports = ${JSON.stringify(icons, null, 2)};`;
  const esmCode = `export default ${JSON.stringify(icons, null, 2)};`;

  fs.writeFileSync(outputPath, type === "cjs" ? commonjsCode : esmCode);
};
