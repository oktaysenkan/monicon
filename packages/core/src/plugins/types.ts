import type { Icon } from "../types";

export type MoniconPluginPayload = {
  icons: Icon[];
};

export type PromiseLike<T> = Promise<T> | T;

export type MoniconPluginFile = {
  path: string;
  content: string;
};

export type MoniconPlugin<T = any> = (opts: T) => (
  payload: MoniconPluginPayload
) => {
  name: string;
  generate: (configUpdated: boolean) => PromiseLike<MoniconPluginFile[]>;
  onPluginsLoad?: (plugins: string[]) => PromiseLike<void>;
  beforeGenerate?: (icons: Icon[]) => PromiseLike<void>;
  afterGenerate?: (icons: Icon[]) => PromiseLike<void>;
  beforeWriteFiles?: (files: MoniconPluginFile[]) => PromiseLike<void>;
  afterWriteFiles?: (files: MoniconPluginFile[]) => PromiseLike<void>;
};

export type MoniconPluginFunction = Awaited<ReturnType<MoniconPlugin>>;

export type MoniconPluginInstance = Awaited<ReturnType<MoniconPluginFunction>>;
