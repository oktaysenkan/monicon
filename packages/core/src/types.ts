import { Loader } from "./loaders";
import { MoniconPluginFunction } from "./plugins";

export type MoniconConfig = {
  icons?: string[];
  watch?: boolean;
  plugins?: MoniconPluginFunction[];
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
