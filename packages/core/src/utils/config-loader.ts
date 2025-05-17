import chokidar from "chokidar";
import { cosmiconfigSync } from "cosmiconfig";
import type { MoniconConfig } from "../types";

const explorer = cosmiconfigSync("monicon", { cache: false });

type WatchConfigFileParams = {
  onUpdate: (config: MoniconConfig) => void;
};

export const loadConfigFile = () => {
  const result = explorer.search();

  const config = (result?.config?.default || result?.config) as MoniconConfig;

  return {
    ...result,
    config,
  };
};

export const watchConfigFile = ({ onUpdate }: WatchConfigFileParams) => {
  const result = explorer.search();

  const filepath = result?.filepath;

  if (filepath) {
    chokidar.watch(filepath).on("change", (file) => {
      console.log("file changed", file);

      const newResult = explorer.load(file);

      onUpdate(
        (newResult?.config?.default || newResult?.config) as MoniconConfig
      );
    });
  }

  return result;
};
