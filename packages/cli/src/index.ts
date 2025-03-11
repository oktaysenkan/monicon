import { loadConfig, LoadConfigOptions, watchConfig } from "c12";
import { mkdirSync, writeFileSync } from "fs";
import { JSDOM } from "jsdom";
import path, { dirname } from "path";
import slugify from "slugify";
import { fileURLToPath } from "url";

slugify.extend({ ":": "/" });

export type MoniconConfig = {
  icons?: string[];
  watch?: boolean;
  outputPath?: string;
};

type CollectionIcon = {
  body: string;
  width?: number;
  height?: number;
};

type Collection = {
  prefix: string;
  lastModified: number;
  width?: number;
  height?: number;
  icons: Record<string, CollectionIcon>;
};

type Icon = {
  name: string;
  body: string;
  width: number;
  height: number;
  svg: string;
};

/**
 * Chunk the strings into smaller arrays
 * @param strings - The strings to chunk
 * @param maxLength - The size of the chunk
 * @returns The chunked strings
 */
export const chunkStrings = (strings: string[], maxLength: number = 400) => {
  const chunks: string[][] = [];
  let currentChunk: string[] = [];
  let currentLength: number = 0;

  for (const str of strings) {
    const stringLength = str.length;

    if (currentLength + stringLength > maxLength) {
      chunks.push(currentChunk);
      currentChunk = [];
      currentLength = 0;
    }

    currentChunk.push(str);
    currentLength += stringLength;
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
};

/**
 * Parse the icons from the input
 * @param icons - The icons to parse eg: `["mdi:home", "mdi:user"]`
 * @returns The parsed icons
 */
export const parseIcons = (icons: string[]) => {
  return icons.map(parseIcon);
};

/**
 * Parse the icon from the input
 * @param icon - The icon to parse eg: `"mdi:home"`
 * @returns The parsed icon
 */
const parseIcon = (icon: string) => {
  const parts = icon.split(":");

  if (parts.length !== 2) {
    throw new Error(
      `Invalid icon format: ${icon}. Expected format: "prefix:name"`
    );
  }

  const [prefix, name] = parts;

  return { prefix, name };
};

/**
 * Create an SVG from the icon body
 * @param icon - The icon to create the SVG from
 * @returns The SVG
 */
const createSvg = (icon: Required<CollectionIcon>) => {
  const { window } = new JSDOM();

  const svg = window.document.createElement("svg");

  const viewBox = `0 0 ${icon.width} ${icon.height}`;

  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", icon.width.toString());
  svg.setAttribute("height", icon.height.toString());
  svg.setAttribute("viewBox", viewBox);

  svg.innerHTML = icon.body;

  return svg.outerHTML;
};

/**
 * Generate an icon file
 * @param icon - The icon to generate the file from
 * @param outputPath - The path to output the file to
 */
const generateIconFile = (icon: Icon, outputPath: string) => {
  const fileName = slugify(icon.name, { lower: true, remove: /:/g });

  const filePath = path.join(outputPath, `${fileName}.svg`);
  const directory = path.dirname(filePath);

  mkdirSync(directory, { recursive: true });
  writeFileSync(filePath, icon.svg, { flag: "wx" });
};

/**
 * Generate icon files
 * @param icons - The icons to generate the files from
 * @param outputPath - The path to output the files to
 */
const generateIconFiles = (icons: Icon[], outputPath: string) => {
  icons.forEach((icon) => generateIconFile(icon, outputPath));
};

/**
 * Get the icons from the input
 * @param icons - The icons to get
 * @returns The icons
 */
const getIcons = async (icons: string[]) => {
  const parsedIcons = parseIcons(Array.from(new Set(icons)));
  const collections = new Map<string, string[]>();

  parsedIcons.forEach((icon) => {
    collections.get(icon.prefix)
      ? collections.get(icon.prefix)?.push(icon.name)
      : collections.set(icon.prefix, [icon.name]);
  });

  const chunkedCollections = new Map<string, string[][]>();

  collections.forEach((names, prefix) =>
    chunkedCollections.set(prefix, chunkStrings(names))
  );

  const urlMap = new Map<string, string[]>();

  for (const [prefix, chunks] of chunkedCollections.entries()) {
    for (const chunk of chunks) {
      const searchParams = new URLSearchParams();

      searchParams.set("icons", chunk.join(","));

      const url = new URL(`https://api.iconify.design/${prefix}.json`);

      url.search = searchParams.toString();

      const collection = urlMap.get(prefix);

      if (!collection) {
        urlMap.set(prefix, [url.toString()]);
        continue;
      }

      collection.push(url.toString());
    }
  }

  const iconsByCollection = new Map<string, Collection>();

  const collectionResponses = await Promise.all(
    Array.from(urlMap.values())
      .flat()
      .map(async (url) => {
        const response = await fetch(url);

        return response.json() as Promise<Collection>;
      })
  );

  for (const response of collectionResponses) {
    const collection = iconsByCollection.get(response.prefix);

    if (!collection) {
      iconsByCollection.set(response.prefix, response);
      continue;
    }

    iconsByCollection.set(response.prefix, {
      ...collection,
      icons: { ...collection.icons, ...response.icons },
    });
  }

  const fullIcons: Icon[] = Array.from(iconsByCollection.values()).flatMap(
    (collection) =>
      Object.entries(collection.icons).map(([name, icon]) => {
        const width = icon.width ?? collection.width ?? 16;
        const height = icon.height ?? collection.height ?? 16;

        const svg = createSvg({ body: icon.body, width, height });

        const iconName = `${collection.prefix}:${name}`;

        return {
          name: iconName,
          width,
          height,
          body: icon.body,
          svg,
        };
      })
  );

  return fullIcons;
};

/**
 * Generate icon files
 * @param iconNames - The icon names to generate the files from
 * @param outputPath - The path to output the files to
 * @returns The generated icons
 */
const generateIcons = async (iconNames: string[], outputPath: string) => {
  const icons = await getIcons(iconNames);
  generateIconFiles(icons, outputPath);

  return icons;
};

/**
 * Start the CLI
 */
export const start = async () => {
  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFile);

  const outputPath = path.join(currentDir, "./src/components/icons");

  const defaultConfig: Required<MoniconConfig> = {
    icons: [],
    watch: true,
    outputPath,
  };

  const userInputConfig: LoadConfigOptions<MoniconConfig> = {
    name: "monicon",
    defaultConfig,
  };

  const config = await loadConfig<MoniconConfig>(userInputConfig);

  const icons = await generateIcons(
    config.config.icons!,
    config.config.outputPath!
  );

  if (config.config.watch) {
    watchConfig<MoniconConfig>({
      ...userInputConfig,
      onUpdate: async ({ newConfig }) => {
        const icons = await generateIcons(
          newConfig.config.icons!,
          newConfig.config.outputPath!
        );

        console.log(icons);
      },
    });
  }

  return config;
};

start();
