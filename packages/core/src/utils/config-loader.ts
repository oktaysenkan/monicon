import chokidar from "chokidar";
import { cosmiconfig, defaultLoaders } from "@oktaysenkan/cosmiconfig";

import type { MoniconConfig } from "../types";

type WatchConfigFileParams = {
  onUpdate: (config: MoniconConfig) => void;
};

const loadJS = (filepath: string) => {
  const isESM = typeof import.meta !== "undefined";

  return isESM ? loadESM(filepath) : loadCJS(filepath);
};

const loadESM = (filepath: string) => {
  return import(`${filepath}?t=${Date.now()}`);
};

const loadCJS = (filepath: string) => {
  return require(`${filepath}?t=${Date.now()}`);
};

const explorer = cosmiconfig("monicon", {
  cache: false,
  loaders: {
    ...defaultLoaders,
    ".js": loadJS,
    ".mjs": loadJS,
  },
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
      console.log("file changed", file);

      const newResult = await explorer.load(file);

      onUpdate(
        (newResult?.config?.default || newResult?.config) as MoniconConfig
      );
    });
  }

  return result;
};
