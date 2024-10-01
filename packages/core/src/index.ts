import { stringToIcon } from "@iconify/utils";
import { loadNodeIcon } from "@iconify/utils/lib/loader/node-loader";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import IconNotFoundError from "./errors/icon-not-found.error";
import InvalidIconError from "./errors/invalid-icon.error";

import { toPx } from "./utils";

export type IconifyOptions = {
  icons: string[];
  outputFileName?: string;
  type?: "cjs" | "esm";
};

type Icon = {
  svg: string;
  width: number;
  height: number;
};

const defaultOptions: IconifyOptions = {
  outputFileName: "icons",
  type: "cjs",
  icons: [],
};

const iconsAsObject: Record<string, Icon> = {};

export const getResolveAlias = () => {
  return "oktay";
};

const getIconsFilePathEsm = (
  fileName: IconifyOptions["outputFileName"] = "icons"
) => {
  // @ts-ignore
  const currentFileName = fileURLToPath(import.meta.url);
  const directory = dirname(currentFileName);

  return path.resolve(directory, `${fileName}.mjs`);
};

const getIconsFilePathCjs = (
  fileName: IconifyOptions["outputFileName"] = "icons"
) => {
  return path.resolve(__dirname, `${fileName}.js`);
};

export const getIconsFilePath = (opts?: IconifyOptions) => {
  const options: IconifyOptions = { ...defaultOptions, ...opts };

  if (options.type === "esm")
    return getIconsFilePathEsm(options.outputFileName);

  return getIconsFilePathCjs(options.outputFileName);
};

export const loadIcon = async (iconName: string) => {
  const iconDetails = stringToIcon(iconName);

  if (!iconDetails) throw InvalidIconError(iconName);

  const svg = await loadNodeIcon(iconDetails.prefix, iconDetails.name);

  if (!svg) throw IconNotFoundError(iconDetails.name, iconDetails.prefix);

  const widthMatch = svg.match(/width="([^"]+)"/);
  const heightMatch = svg.match(/height="([^"]+)"/);

  const width = toPx(widthMatch?.[1] ?? "1em");
  const height = toPx(heightMatch?.[1] ?? "1em");

  iconsAsObject[iconName] = {
    svg: svg,
    width: width,
    height: height,
  };
};

export const loadIcons = async (opts?: IconifyOptions) => {
  const options: IconifyOptions = {
    ...defaultOptions,
    ...opts,
  };

  for (const icon of options.icons) {
    await loadIcon(icon);
  }

  const outputPath = getIconsFilePath(options);

  writeIcons(outputPath, options.type);
};

const writeIcons = (
  outputPath: string,
  type: IconifyOptions["type"] = "cjs"
) => {
  const commonjsCode = `module.exports = ${JSON.stringify(iconsAsObject, null, 2)};`;
  const esmCode = `export default ${JSON.stringify(iconsAsObject, null, 2)};`;

  fs.writeFileSync(outputPath, type === "cjs" ? commonjsCode : esmCode);
};
