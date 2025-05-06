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
  onStart: () => PromiseLike<MoniconPluginFile[]>;
  onUpdate: () => PromiseLike<MoniconPluginFile[]>;
};
