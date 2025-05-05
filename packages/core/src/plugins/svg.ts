import type { Icon, MoniconPlugin } from "..";
import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import slugify from "slugify";

export type SvgPluginOptions = void | {
  outputPath?: string;
};

/**
 * Generate icon files
 * @param icons - The icons to generate
 * @param outputPath - The path to output the icons to
 */
const generateIconFiles = (icons: Icon[], outputPath: string) => {
  icons.forEach((icon) => {
    const fileName = slugify(icon.name, { lower: true, remove: /:/g });

    const filePath = path.join(outputPath, `${fileName}.svg`);
    const directory = path.dirname(filePath);

    mkdirSync(directory, { recursive: true });
    writeFileSync(filePath, icon.svg, { flag: "w" });
  });
};

/**
 * SVG plugin to generate icon files
 * @param options - The options for the plugin
 */
export const svg: MoniconPlugin<SvgPluginOptions> = (options) => (payload) => {
  return {
    name: "monicon-svg-plugin",
    onStart: () => generateIconFiles(payload.icons, payload.config.outputPath),
    onUpdate: () => generateIconFiles(payload.icons, payload.config.outputPath),
  };
};
