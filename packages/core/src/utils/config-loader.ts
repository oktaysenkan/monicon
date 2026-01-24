import chokidar from "chokidar";
import { cosmiconfig } from "cosmiconfig";
import { loadJsSync, loadTsSync } from "cosmiconfig/dist/loaders";

import type { MoniconConfig } from "../types";

type WatchConfigFileParams = {
  onUpdate: (config: MoniconConfig) => void;
};

const explorer = cosmiconfig("monicon", {
  cache: false,
  loaders: {
    '.js': loadJsSync,
    '.mjs': loadJsSync,
    '.cjs': loadJsSync,
    '.ts': loadTsSync,
  }
});

export const loadConfigFile = async () => {
  const result = await explorer.search();

  const config = (result?.config?.default || result?.config) as MoniconConfig;

  return {
    ...result,
    config,
  };
};

export const watchConfigFile = async ({ onUpdate }: WatchConfigFileParams) => {
  const result = await explorer.search();

  const filepath = result?.filepath;

  if (filepath) {
    chokidar.watch(filepath).on("change", async (file) => {
      const newResult = await explorer.load(file);

      onUpdate(
        (newResult?.config?.default || newResult?.config) as MoniconConfig
      );
    });
  }

  return result;
};
