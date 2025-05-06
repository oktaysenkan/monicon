import { MoniconPlugin } from "../types";

/**
 * Debugger plugin to log the icons and files
 * @param options - The options for the plugin
 */
export const debuggerPlugin: MoniconPlugin<void> = (options) => (payload) => {
  return {
    name: "monicon-debugger-plugin",
    generate: () => [],
    onPluginsLoad: (plugins) => {
      console.log(
        `[Monicon - Debugger Plugin] On plugins load ${plugins.length} plugins`
      );
    },
    beforeGenerate: (icons) => {
      console.log(
        `[Monicon - Debugger Plugin] Before generate ${icons.length} icons`
      );
    },
    afterGenerate: (icons) => {
      console.log(
        `[Monicon - Debugger Plugin] After generate ${icons.length} icons`
      );
    },
    beforeWriteFiles: (files) => {
      console.log(
        `[Monicon - Debugger Plugin] Before write files ${files.length} files`
      );
    },
    afterWriteFiles: (files) => {
      console.log(
        `[Monicon - Debugger Plugin] After write files ${files.length} files`
      );
    },
  };
};
