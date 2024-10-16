import { type IntermediateConfigT } from "metro-config";
import {
  getIconsFilePath,
  getResolveAlias,
  MoniconBundlerOptions,
  watchConfig,
} from "@monicon/core";

export const withMonicon = (
  metroConfig: IntermediateConfigT,
  options?: MoniconBundlerOptions
): IntermediateConfigT => {
  const alias = getResolveAlias();

  void watchConfig({ type: "cjs", ...options });

  metroConfig.resolver.extraNodeModules = {
    ...metroConfig.resolver.extraNodeModules,
    [alias]: getIconsFilePath({ type: "cjs", ...options }),
  };

  return metroConfig;
};
