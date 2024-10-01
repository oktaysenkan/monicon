import { stringToIcon } from "@iconify/utils";
import { loadNodeIcon } from "@iconify/utils/lib/loader/node-loader";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import IconNotFoundError from "./errors/icon-not-found.error";
import InvalidIconError from "./errors/invalid-icon.error";

import { toPx } from "./utils";

type Icon = {
  svg: string;
  width: number;
  height: number;
};

const iconsAsObject: Record<string, Icon> = {};

const getIconsFilePathEsm = () => {
  // @ts-ignore
  const fileName = fileURLToPath(import.meta.url);
  const directory = dirname(fileName);

  return path.resolve(directory, `icons.mjs`);
};

const getIconsFilePathCjs = () => {
  return path.resolve(__dirname, `icons.js`);
};

export const getIconsFilePath = (type: "commonjs" | "esm" = "commonjs") => {
  if (type === "esm") return getIconsFilePathEsm();

  return getIconsFilePathCjs();
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

export const loadIcons = async (
  icons: string[],
  type: "commonjs" | "esm" = "commonjs"
) => {
  for (const icon of icons) {
    await loadIcon(icon);
  }

  const outputPath = getIconsFilePath(type);

  writeIcons(outputPath, type);
};

const writeIcons = (
  outputPath: string,
  type: "commonjs" | "esm" = "commonjs"
) => {
  const commonjsCode = `module.exports = ${JSON.stringify(iconsAsObject, null, 2)};`;
  const esmCode = `export default ${JSON.stringify(iconsAsObject, null, 2)};`;

  fs.writeFileSync(outputPath, type === "commonjs" ? commonjsCode : esmCode);
};
