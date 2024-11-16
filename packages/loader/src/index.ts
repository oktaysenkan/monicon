import { glob } from "glob";
import { readFileSync } from "fs";
import slugify from "slugify";
import * as _ from "radashi";
import path from "path";
import * as f from "fuuu";
import { parseSync } from "svgson";

slugify.extend({ "/": "-" });

export type LoaderResult = Record<string, string>;

export type Loader<T = any> = (
  input: T
) => () => Promise<LoaderResult> | LoaderResult;

export type JSONLoaderOptions =
  | string
  | {
      url: string;
      options?: RequestInit;
    };

type Content = {
  name: string;
  content: string;
};

const isValidSvg = (svg: string) => {
  const parsed = f.syncSafe(() => parseSync(svg));

  return !parsed.error;
};

export const JSONLoader: Loader<JSONLoaderOptions> = (input) => async () => {
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
      console.warn(`[Monicon] The response from "${url}" is not a valid SVG.`);
      delete content.data[key];
    }
  });

  return content.data as LoaderResult;
};

export type RemoteLoaderOptions = Record<
  string,
  | string
  | {
      url: string;
      options?: RequestInit;
    }
>;

export const remoteLoader: Loader<RemoteLoaderOptions> =
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

    return asObject as LoaderResult;
  };

export type LocalLoaderOptions =
  | string
  | {
      directory: string;
    };

export const localLoader: Loader<LocalLoaderOptions> = (input) => () => {
  const directory = typeof input === "string" ? input : input.directory;

  if (!directory) throw new Error("directory is required");

  const directoryAbsolutePath = path.resolve(directory);

  const filePaths = glob.sync(`${directory}/**/*.svg`);

  if (!filePaths.length) {
    console.warn(
      `[Monicon] No files were found in the directory "${directory}".`
    );
  }

  const files = filePaths.map((filePath) => {
    const content = f.syncSafe(() => readFileSync(filePath, "utf-8"));

    if (content.error) {
      console.warn(
        `[Monicon] The file "${filePath}" was not found. This file might not exist, or the required icon file might not be in the correct format.`
      );
      return;
    }

    if (!isValidSvg(content.data)) {
      console.warn(`[Monicon] The file "${filePath}" is not a valid SVG.`);
      return;
    }

    const fileAbsolutePath = path.resolve(filePath);

    const relativePath = fileAbsolutePath.replace(
      `${directoryAbsolutePath}/`,
      ""
    );

    const fileNameWithoutExtension = relativePath.slice(0, -4).trim();

    const slugified = slugify(fileNameWithoutExtension, { lower: true });

    return { name: slugified, content: content.data } as Content;
  });

  const filesFiltered = files.filter((item) => !!item) as Content[];

  const asObject = _.objectify(
    filesFiltered,
    (item) => item.name,
    (item) => item.content
  );

  return asObject;
};
