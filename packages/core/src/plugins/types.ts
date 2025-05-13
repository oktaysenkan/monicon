import type { Icon } from "../types";

export type MoniconPluginPayload = {
  icons: Icon[];
};

export type PromiseLike<T> = Promise<T> | T;

export type MoniconPluginFile = {
  path: string;
  content: string;
};

export type MoniconPluginContext<T = any> = T & {
  configUpdated: boolean;
};

export type MoniconPluginLoadContext = MoniconPluginContext<{
  plugins: string[];
}>;

export type MoniconPluginGenerateContext = MoniconPluginContext<{
  icons: Icon[];
}>;

export type MoniconPluginWriteFilesContext = MoniconPluginContext<{
  files: MoniconPluginFile[];
}>;

export type MoniconPlugin<T = any> = (opts: T) => (
  payload: MoniconPluginPayload
) => {
  name: string;
  generate: (
    context: MoniconPluginGenerateContext
  ) => PromiseLike<MoniconPluginFile[]>;
  onPluginsLoad?: (context: MoniconPluginLoadContext) => PromiseLike<void>;
  beforeGenerate?: (context: MoniconPluginGenerateContext) => PromiseLike<void>;
  afterGenerate?: (context: MoniconPluginGenerateContext) => PromiseLike<void>;
  beforeWriteFiles?: (
    context: MoniconPluginWriteFilesContext
  ) => PromiseLike<void>;
  afterWriteFiles?: (
    context: MoniconPluginWriteFilesContext
  ) => PromiseLike<void>;
};

export type MoniconPluginFunction = Awaited<ReturnType<MoniconPlugin>>;

export type MoniconPluginInstance = Awaited<ReturnType<MoniconPluginFunction>>;
