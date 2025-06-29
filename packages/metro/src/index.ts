import type { IntermediateConfigT } from "metro-config";
import { bootstrap, MoniconConfig } from "@monicon/core";

export const withMonicon = (
  metroConfig: IntermediateConfigT,
  config?: MoniconConfig
): IntermediateConfigT => {
  const isDev = process.env.BUILD_MODE !== "production";
  const isDev2 = metroConfig.transformer?.enableBabelRCLookup !== false;

  console.log({
    BUILD_MODE: process.env.BUILD_MODE,
    NODE_ENV: process.env.NODE_ENV,
    isDev2,
  });

  console.log("isDev", isDev);

  void bootstrap(config);

  return metroConfig;
};
