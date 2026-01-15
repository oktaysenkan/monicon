import fs from "fs";
import glob from "./glob";
import type { MoniconPlugin } from "../types";

export type CleanOptions = {
  patterns: string[];
  enabled?: boolean;
};

/**
 * Clean plugin to remove files and directories before generating new icons
 * @param options - The options for the plugin
 */
export const clean: MoniconPlugin<CleanOptions> = (options) => {
  return () => ({
    name: "clean",
    generate: async () => {
      return [];
    },
    beforeWriteFiles: async () => {
      const enabled = options.enabled ?? true;

      if (!enabled) return;

      const files = options.patterns.flatMap((pattern) => glob.sync(pattern));

      files.forEach((path) => {
        const isExists = fs.existsSync(path);

        if (!isExists) return;

        const isDirectory = fs.lstatSync(path).isDirectory();

        isDirectory
          ? fs.rmSync(path, { recursive: true, force: true })
          : fs.unlinkSync(path);
      });
    },
  });
};
