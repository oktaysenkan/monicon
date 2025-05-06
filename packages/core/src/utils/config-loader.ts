import chokidar from "chokidar";
import { cosmiconfig } from "cosmiconfig";
import type { MoniconConfig } from "../types";

const explorer = cosmiconfig("monicon");

type WatchConfigFileParams = {
  onUpdate: (config: MoniconConfig) => void;
};

export const loadConfigFile = async () => {
  const result = await explorer.search();

  const config = result?.config?.default as MoniconConfig;

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
      explorer.clearCaches();

      const newResult = await explorer.load(filepath);

      onUpdate(newResult?.config?.default as MoniconConfig);
    });
  }

  return result;
};
