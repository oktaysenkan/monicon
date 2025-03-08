import { loadConfig, LoadConfigOptions, watchConfig } from "c12";

export type Config = {
  icons?: string[];
  watch?: boolean;
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
      Object.entries(collection.icons).map(([name, icon]) => ({
        ...icon,
        name: `${collection.prefix}:${name}`,
        width: icon.width ?? collection.width ?? 16,
        height: icon.height ?? collection.height ?? 16,
      }))
  );

  return fullIcons;
};

export const loadIcons = async () => {
  const defaultConfig: Required<Config> = {
    icons: [],
    watch: true,
  };

  const userInputConfig: LoadConfigOptions<Config> = {
    name: "monicon",
    defaultConfig,
  };

  const config = await loadConfig<Config>(userInputConfig);

  const icons = await getIcons(config.config.icons!);
  console.log(icons);

  if (config.config.watch) {
    watchConfig<Config>({
      ...userInputConfig,
      onUpdate: async ({ newConfig }) => {
        const icons = await getIcons(newConfig.config.icons!);
        console.log();
        console.log(icons);
        console.log();
        console.log("updated", new Date().toISOString());
      },
    });
  }

  return config;
};

loadIcons();
