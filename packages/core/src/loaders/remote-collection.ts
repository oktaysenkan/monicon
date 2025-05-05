import * as f from "fuuu";
import * as _ from "radashi";
import { Content, Loader, LoaderResult } from "./types";
import { isValidSvg } from "./utils";

export type RemoteCollectionLoaderOptions = Record<
  string,
  | string
  | {
      url: string;
      options?: RequestInit;
    }
>;

export const loadRemoteCollection: Loader<RemoteCollectionLoaderOptions> =
  (input) => async () => {
    const asArray = await Promise.all(
      Object.entries(input).map(async ([key, value]) => {
        const url = typeof value === "string" ? value : value.url;

        const options = typeof value === "string" ? undefined : value.options;

        const response = await f.safe(() => fetch(url, options));

        if (response.error) {
          console.warn(`[Monicon] Request to "${url}" failed.`);
          return;
        }

        const content = await f.safe(() => response.data.text());

        if (content.error) {
          console.warn(`[Monicon] Unable to parse response from "${url}".`);
          return;
        }

        if (!isValidSvg(content.data)) {
          console.warn(
            `[Monicon] The response from "${url}" is not a valid SVG.`
          );
          return;
        }

        return { name: key, content: content.data } as Content;
      })
    );

    const asArrayFiltered = asArray.filter((item) => !!item) as Content[];

    const asObject = _.objectify(
      asArrayFiltered,
      (item) => item.name,
      (item) => item.content
    );

    return asObject satisfies LoaderResult;
  };
