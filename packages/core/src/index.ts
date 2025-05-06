import { JSDOM } from "jsdom";
import path from "path";
import { parseSync, stringify } from "svgson";
import { fileURLToPath } from "url";

import { toPx, watchConfigFile, loadConfigFile } from "./utils";
import { Loader } from "./loaders";
import { MoniconPlugin, MoniconPluginFile } from "./plugins";

export type MoniconConfig = {
  icons?: string[];
  watch?: boolean;
  plugins?: ReturnType<MoniconPlugin>[];
  loaders?: Record<string, ReturnType<Loader>>;
  collections?: string[];
};

export type CollectionIcon = {
  body: string;
  width?: number;
  height?: number;
};

export type Collection = {
  prefix: string;
  lastModified: number;
  width?: number;
  height?: number;
  icons: Record<string, CollectionIcon>;
};

export type Icon = {
  name: string;
  body: string;
  width: number;
  height: number;
  svg: string;
};

/**
 * Get the current file name and directory name
 * @returns The current file name and directory name
 */
export const getCurrentPath = () => {
  const isESM = Boolean(import.meta?.url);

  if (!isESM) {
    return {
      fileName: __filename,
      directoryName: __dirname,
    };
  }

  const currentFile = fileURLToPath(import.meta?.url);

  return {
    fileName: currentFile,
    directoryName: path.dirname(currentFile),
  };
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

export const transformIcon = (svg: string) => {
  const svgObject = parseSync(svg);

  const width = toPx(svgObject.attributes.width ?? "1em");
  const height = toPx(svgObject.attributes.height ?? "1em");

  const body = svgObject.children.map((child) => stringify(child)).join("");

  return {
    svg,
    width: width,
    height: height,
    body,
  };
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
export const parseIcon = (icon: string) => {
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
 * Get the icons from the input
 * @param icons - The icons to get
 * @returns The icons
 */
const fetchIcons = async (icons: string[]) => {
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
 * Get the icons from the loaders
 * @param config - The config
 * @returns The loaded icons
 */
const getLoaderIcons = async (config: Required<MoniconConfig>) => {
  const loaders = Object.entries(config.loaders);

  const loadedIcons: Record<string, Icon> = {};

  for await (const [loaderName, loader] of loaders) {
    const loaderResult = await loader();

    for await (const [iconName, svg] of Object.entries(loaderResult)) {
      const icon = transformIcon(svg);

      const name = `${loaderName}:${iconName}`;

      loadedIcons[name] = { name, ...icon };
    }
  }

  return Object.values(loadedIcons);
};

const fetchCollectionIcons = async (config: Required<MoniconConfig>) => {
  // TODO: write to file system for caching. Request iconify last modified date and compare with the local file. If it's newer, fetch the new icons.
  const urls = config.collections.map((collection) => {
    return `https://raw.githubusercontent.com/iconify/icon-sets/refs/heads/master/json/${collection}.json`;
  });

  const collectionResponses = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);

      return response.json() as Promise<Collection>;
    })
  );

  const icons = collectionResponses.flatMap((collection) => {
    return Object.entries(collection.icons).map(([name, icon]) => {
      const width = icon.width ?? collection.width ?? 16;
      const height = icon.height ?? collection.height ?? 16;

      const svg = createSvg({ body: icon.body, width, height });

      return {
        name: `${collection.prefix}:${name}`,
        width,
        height,
        body: icon.body,
        svg,
      };
    });
  });

  return icons;
};

/**
 * Write the files to the file system
 * @param files - The files to write
 */
const writeFiles = async (files: MoniconPluginFile[]) => {
  console.log(files);
  console.log(`Monicon - ${files.length} icons generated`);
};

/**
 * Run the plugins
 * @param config - The config
 * @param icons - The icons to run the plugins on
 * @param configModified - Whether the config has been modified
 */
const loadPlugins = async (
  config: Required<MoniconConfig>,
  icons: Icon[],
  configModified?: boolean
) => {
  const plugins = config.plugins;

  const files = await Promise.all(
    plugins.map(async (plugin) => {
      const pluginInstance = plugin({ icons });

      const loadedFiles = configModified
        ? await pluginInstance.onUpdate()
        : await pluginInstance.onStart();

      return loadedFiles;
    })
  );

  writeFiles(files.flat());

  return files.flat();
};

/**
 * Generate icon files
 * @param config - The config
 * @param configModified - Whether the config has been modified
 * @returns The generated icons
 */
const generateIcons = async (
  config: Required<MoniconConfig>,
  configModified: boolean
) => {
  const message = configModified
    ? "Config updated icons will be re-generated"
    : "Generating icons";

  console.log(`Monicon - ${message}`);

  const [fetchedIcons, collectionIcons, loaderIcons] = await Promise.all([
    fetchIcons(config.icons),
    fetchCollectionIcons(config),
    getLoaderIcons(config),
  ]);

  const allIcons = [...fetchedIcons, ...loaderIcons, ...collectionIcons];

  const uniqueIcons = new Map<string, Icon>();

  allIcons.forEach((icon) => uniqueIcons.set(icon.name, icon));

  await loadPlugins(config, Array.from(uniqueIcons.values()), configModified);

  return allIcons;
};

export const bootstrap = async (options?: MoniconConfig) => {
  const defaultConfig: Required<MoniconConfig> = {
    icons: [],
    watch: true,
    plugins: [],
    loaders: {},
    collections: [],
    ...options,
  };

  const loadedConfig = await loadConfigFile();

  const config = { ...defaultConfig, ...loadedConfig.config };

  await generateIcons(config, false);

  if (config.watch) {
    await watchConfigFile({
      onUpdate: async (newConfig) => {
        await generateIcons({ ...defaultConfig, ...newConfig }, true);
      },
    });
  }
};
