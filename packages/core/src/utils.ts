import { cosmiconfig } from "cosmiconfig";
import chokidar from "chokidar";

import { MoniconConfig } from "./index";

const explorer = cosmiconfig("monicon");

export const toPx = (value: string) => {
  if (value.endsWith("em")) {
    return parseFloat(value) * 16;
  }

  return parseFloat(value);
};

export const loadConfigFile = async () => {
  const result = await explorer.search();

  const config = result?.config?.default as MoniconConfig;

  return {
    ...result,
    config,
  };
};

export type WatchConfigFileParams = {
  onUpdate: (config: MoniconConfig) => void;
};

export const watchConfigFile = async ({ onUpdate }: WatchConfigFileParams) => {
  const result = await explorer.search();

  const filepath = result?.filepath;

  if (filepath) {
    chokidar.watch(filepath).on("change", async (file) => {
      explorer.clearCaches();

      const newResult = await explorer.load(filepath);

      onUpdate(newResult?.config?.default as MoniconConfig);
    });
  }

  return result;
};
