import * as f from "fuuu";
import { Loader, LoaderResult } from "./types";
import { isValidSvg } from "./utils";

export type JSONCollectionLoaderOptions =
  | string
  | {
      url: string;
      options?: RequestInit;
    };

export const loadJSONCollection: Loader<JSONCollectionLoaderOptions> =
  (input) => async () => {
    const url = typeof input === "string" ? input : input.url;

    const options = typeof input === "string" ? undefined : input.options;

    const response = await f.safe(() => fetch(url, options));

    if (response.error) {
      console.warn(`[Monicon] Request to "${url}" failed.`);
      return {};
    }

    const content = await f.safe<LoaderResult>(() => response.data.json());

    if (content.error) {
      console.warn(`[Monicon] Unable to parse response from "${url}".`);
      return {};
    }

    Object.entries(content.data).forEach(([key, value]) => {
      if (!isValidSvg(value)) {
        console.warn(
          `[Monicon] The response from "${url}" is not a valid SVG.`
        );
        delete content.data[key];
      }
    });

    return content.data satisfies LoaderResult;
  };
