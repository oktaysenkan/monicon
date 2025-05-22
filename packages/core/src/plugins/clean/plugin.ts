import fs from "fs";
import { glob } from "glob";
import type { MoniconPlugin } from "../types";

export type CleanOptions = {
  patterns: string[];
  enabled?: boolean;
};

export const clean: MoniconPlugin<CleanOptions> = (opts) => {
  return () => ({
    name: "clean",
    generate: async () => {
      return [];
    },
    beforeWriteFiles: async (context) => {
      const enabled = opts.enabled ?? true;

      if (!enabled) return;

      const files = opts.patterns.flatMap((pattern) => glob.sync(pattern));

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
