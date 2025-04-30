import type { IntermediateConfigT } from "metro-config";
import { bootstrap, MoniconConfig } from "@monicon/core";

export const withMonicon = (
  metroConfig: IntermediateConfigT,
  config: MoniconConfig
): IntermediateConfigT => {
  void bootstrap(config);

  return metroConfig;
};
