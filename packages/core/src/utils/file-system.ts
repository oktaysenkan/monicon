import fs from "fs/promises";
import path from "path";
import { MoniconPluginFile } from "../plugins";

/**
 * Write the files to the file system
 * @param files - The files to write
 */
export const writeFiles = async (files: MoniconPluginFile[]) => {
  await Promise.all(
    files.map(async (file) => {
      await fs.mkdir(path.dirname(file.path), { recursive: true });
      await fs.writeFile(file.path, file.content);
    })
  );
};
