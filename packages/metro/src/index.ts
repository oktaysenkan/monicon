import { type IntermediateConfigT } from "metro-config";
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

  void loadIcons(options);

  metroConfig.resolver.extraNodeModules = {
    ...metroConfig.resolver.extraNodeModules,
    [alias]: getIconsFilePath(options),
  };

  return metroConfig;
};
