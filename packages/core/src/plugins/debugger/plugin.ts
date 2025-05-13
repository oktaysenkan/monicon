import { MoniconPlugin } from "../types";

/**
 * Debugger plugin to log the icons and files
 * @param options - The options for the plugin
 */
export const debuggerPlugin: MoniconPlugin<void> = (options) => (payload) => {
  return {
    name: "monicon-debugger-plugin",
    generate: () => [],
    onPluginsLoad: (context) => {
      console.log(
        `[Monicon - Debugger Plugin] On plugins load ${context.plugins.length} plugins`
      );
    },
    beforeGenerate: (context) => {
      console.log(
        `[Monicon - Debugger Plugin] Before generate ${context.icons.length} icons`
      );
    },
    afterGenerate: (context) => {
      console.log(
        `[Monicon - Debugger Plugin] After generate ${context.icons.length} icons`
      );
    },
    beforeWriteFiles: (context) => {
      console.log(
        `[Monicon - Debugger Plugin] Before write files ${context.files.length} files`
      );
      console.log(context.files);
    },
    afterWriteFiles: (context) => {
      console.log(
        `[Monicon - Debugger Plugin] After write files ${context.files.length} files`
      );
    },
  };
};
