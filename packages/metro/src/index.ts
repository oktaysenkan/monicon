import type { IntermediateConfigT } from "metro-config";
import { bootstrap, MoniconConfig } from "@monicon/core";

// @ts-expect-error __DEV__ is not defined in the globalThis object
const isDevelopmentMode = typeof __DEV__ !== "undefined" ? __DEV__ : false;

export const withMonicon = (
  metroConfig: IntermediateConfigT,
  config?: MoniconConfig
): IntermediateConfigT => {
  void bootstrap({
    watch: isDevelopmentMode,
    ...config,
  });

  return metroConfig;
};
