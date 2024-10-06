declare module "babel-plugin-module-resolver" {
  interface PluginOptions {
    root?: string[];
    alias?: { [key: string]: string };
    extensions?: string[];
    cwd?: string;
  }

  const resolvePath = (source: string, file: string, options: PluginOptions) =>
    string;
}
