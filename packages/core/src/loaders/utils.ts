import * as _ from "radashi";
import * as f from "fuuu";
import { parseSync } from "svgson";

export const isValidSvg = (svg: string) => {
  const parsed = f.syncSafe(() => parseSync(svg));

  return !parsed.error;
};
