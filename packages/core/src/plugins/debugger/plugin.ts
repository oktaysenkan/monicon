import { MoniconPlugin } from "../types";

export type DebuggerPluginOptions = {
  enabled?: boolean;
} | void;

/**
 * Debugger plugin to log the icons and files
 * @param options - The options for the plugin
 */
export const debuggerPlugin: MoniconPlugin<DebuggerPluginOptions> =
  (options) => () => {
    return {
      name: "monicon-debugger-plugin",
      generate: () => [],
      onPluginsLoad: (context) => {
        const enabled = options?.enabled ?? true;

        if (!enabled) return;

        console.log(
          `[Monicon - Debugger Plugin] On plugins load ${context.plugins.length} plugins`
        );
      },
      beforeGenerate: (context) => {
        const enabled = options?.enabled ?? true;

        if (!enabled) return;

        console.log(
          `[Monicon - Debugger Plugin] Before generate ${context.icons.length} icons`
        );
      },
      afterGenerate: (context) => {
        const enabled = options?.enabled ?? true;

        if (!enabled) return;

        console.log(
          `[Monicon - Debugger Plugin] After generate ${context.icons.length} icons`
        );
      },
      beforeWriteFiles: (context) => {
        const enabled = options?.enabled ?? true;

        if (!enabled) return;

        console.log(
          `[Monicon - Debugger Plugin] Before write files ${context.files.length} files`
        );
      },
      afterWriteFiles: (context) => {
        const enabled = options?.enabled ?? true;

        if (!enabled) return;

        console.log(
          `[Monicon - Debugger Plugin] After write files ${context.files.length} files`
        );
      },
    };
  };
