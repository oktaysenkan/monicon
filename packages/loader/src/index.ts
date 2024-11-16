import { glob } from "glob";
import { readFileSync } from "fs";
import slugify from "slugify";
import * as _ from "radashi";
import path from "path";

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

export const JSONLoader: Loader<JSONLoaderOptions> = (input) => async () => {
  const url = typeof input === "string" ? input : input.url;

  const options = typeof input === "string" ? undefined : input.options;

  const response = await fetch(url, options);

  const content = await response.json();

  return content as LoaderResult;
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

        const response = await fetch(url, options);

        const content = await response.text();

        return { name: key, content };
      })
    );

    const asObject = _.objectify(
      asArray,
      (f) => f.name,
      (f) => f.content
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

  const files = filePaths.map((filePath) => {
    const content = readFileSync(filePath, "utf-8");

    const fileAbsolutePath = path.resolve(filePath);

    const relativePath = fileAbsolutePath.replace(
      `${directoryAbsolutePath}/`,
      ""
    );

    const fileNameWithoutExtension = relativePath.slice(0, -4).trim();

    const slugified = slugify(fileNameWithoutExtension, { lower: true });

    return { name: slugified, content };
  });

  const asObject = _.objectify(
    files,
    (f) => f.name,
    (f) => f.content
  );

  return asObject;
};
