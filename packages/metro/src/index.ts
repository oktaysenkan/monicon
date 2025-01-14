import type { IntermediateConfigT } from "metro-config";
import {
  loadIcons,
  getIconsFilePath,
  getResolveAlias,
  MoniconOptions,
} from "@monicon/core";

export const withMonicon = (
  metroConfig: IntermediateConfigT,
  options?: MoniconOptions
): IntermediateConfigT => {
  const alias = getResolveAlias();

  const config: MoniconOptions = { ...options, type: "cjs" };

  void loadIcons(config);

  metroConfig.resolver.extraNodeModules = {
    ...metroConfig.resolver.extraNodeModules,
    [alias]: getIconsFilePath(config),
  };

  return metroConfig;
};
