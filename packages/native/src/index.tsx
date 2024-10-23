import { Platform } from "react-native";
export type { MoniconProps } from "@monicon/icon-loader";

import MoniconWeb from "./Monicon.web";
import MoniconNative from "./Monicon.native";

const Monicon = Platform.select({
  web: MoniconWeb,
  default: MoniconNative,
});

export { Monicon };
export default Monicon;
