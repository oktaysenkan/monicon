import { readFileSync } from "fs";
import * as f from "fuuu";
import { glob } from "glob";
import path from "path";
import * as _ from "radashi";
import slugify from "slugify";
import { Content, Loader, LoaderResult } from "./types";
import { isValidSvg } from "./utils";

slugify.extend({ "/": "-" });

export type LocalCollectionLoaderOptions =
  | string
  | {
      directory: string;
    };

export const loadLocalCollection: Loader<LocalCollectionLoaderOptions> =
  (input) => () => {
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

    return asObject satisfies LoaderResult;
  };
