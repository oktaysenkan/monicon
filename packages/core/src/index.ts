import { stringToIcon } from "@iconify/utils/lib/icon/name";
import { loadCollectionFromFS } from "@iconify/utils/lib/loader/fs";
import { loadNodeIcon } from "@iconify/utils/lib/loader/node-loader";
import fs from "fs";
import path, { dirname } from "path";
import { parseSync } from "svgson";
import { fileURLToPath } from "url";

import { toPx } from "./utils";

export type MoniconOptions = {
  icons: string[];
  collections?: string[];
  outputFileName?: string;
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
