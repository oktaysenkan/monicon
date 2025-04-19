import { loadConfig, LoadConfigOptions, watchConfig } from "c12";
import { JSDOM } from "jsdom";
import path, { dirname } from "path";
import slugify from "slugify";
import { fileURLToPath } from "url";

slugify.extend({ ":": "/" });

export type MoniconPluginPayload = {
  config: Required<MoniconConfig>;
  icons: Icon[];
};

export type MoniconPlugin<T = any> = (opts: T) => (
  payload: MoniconPluginPayload
) => {
  name: string;
  onStart(): Promise<void> | void;
  onUpdate(): Promise<void> | void;
};

export type MoniconConfig = {
  icons?: string[];
  watch?: boolean;
  outputPath?: string;
  plugins?: ReturnType<MoniconPlugin>[];
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
 * Run the plugins
 * @param config - The config
 * @param icons - The icons to run the plugins on
 * @param configModified - Whether the config has been modified
 */
const runPlugins = async (
  config: Required<MoniconConfig>,
  icons: Icon[],
  configModified: boolean
) => {
  const plugins = config.plugins ?? [];

  await Promise.all(
    plugins.map((plugin) => {
      const pluginInstance = plugin({ icons, config });

      return configModified
        ? pluginInstance.onUpdate()
        : pluginInstance.onStart();
    })
  );
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
  const icons = await getIcons(config.icons!);

  await runPlugins(config, icons, configModified);

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
    plugins: [],
  };

  const userInputConfig: LoadConfigOptions<MoniconConfig> = {
    name: "monicon",
    defaultConfig,
  };

  const loadedConfig = await loadConfig<MoniconConfig>(userInputConfig);

  const config = loadedConfig.config as Required<MoniconConfig>;

  await generateIcons(config, false);

  if (config.watch) {
    watchConfig<MoniconConfig>({
      ...userInputConfig,
      onUpdate: async (context) => {
        const newConfig = context.newConfig.config as Required<MoniconConfig>;

        await generateIcons(newConfig, true);
      },
    });
  }

  return config;
};

start();
