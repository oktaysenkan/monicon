import { type IntermediateConfigT } from "metro-config";
import { loadIcons, getIconsFilePath } from "@oktaytest/core";

export type IconifyOptions = {
  icons: string[];
};

export const withIconify = (
  metroConfig: IntermediateConfigT,
  options?: IconifyOptions
): IntermediateConfigT => {
  void loadIcons(options?.icons ?? []);

  metroConfig.resolver.extraNodeModules = {
    ...metroConfig.resolver.extraNodeModules,
    oktay: getIconsFilePath("commonjs"),
  };

  return metroConfig;
};
