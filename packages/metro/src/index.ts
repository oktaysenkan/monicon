import { type IntermediateConfigT } from "metro-config";
import {
  loadIcons,
  getIconsFilePath,
  getResolveAlias,
  IconifyOptions,
} from "@oktaytest/core";

export const withIconify = (
  metroConfig: IntermediateConfigT,
  options?: IconifyOptions
): IntermediateConfigT => {
  const alias = getResolveAlias();

  void loadIcons(options);

  metroConfig.resolver.extraNodeModules = {
    ...metroConfig.resolver.extraNodeModules,
    [alias]: getIconsFilePath(options),
  };

  return metroConfig;
};
