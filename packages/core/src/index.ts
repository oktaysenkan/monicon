import { stringToIcon } from "@iconify/utils/lib/icon/name";
import { loadNodeIcon } from "@iconify/utils/lib/loader/node-loader";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { toPx } from "./utils";

export type MoniconOptions = {
  icons: string[];
  outputFileName?: string;
  type?: "cjs" | "esm";
};

export type Icon = {
  svg: string;
  width: number;
  height: number;
};

const defaultOptions: MoniconOptions = {
  outputFileName: "icons",
  type: "cjs",
  icons: [],
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

  const widthMatch = svg.match(/width="([^"]+)"/);
  const heightMatch = svg.match(/height="([^"]+)"/);

  const width = toPx(widthMatch?.[1] ?? "1em");
  const height = toPx(heightMatch?.[1] ?? "1em");

  return {
    svg: svg,
    width: width,
    height: height,
  } satisfies Icon;
};

export const loadIcons = async (opts?: MoniconOptions) => {
  const options: MoniconOptions = {
    ...defaultOptions,
    ...opts,
  };

  const loadedIcons: Record<string, Icon> = {};

  for (const iconName of options.icons) {
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
