#!/usr/bin/env node

import pkg from "../package.json" assert { type: "json" };
import cac from "cac";
import { bootstrap } from "@monicon/core";
import { loadConfigFile } from "@monicon/core/utils";

const cli = cac("monicon");

cli.command("").action(() => cli.outputHelp());

cli
  .command("generate", "Generate icons")
  .option("-w, --watch", "Watch for changes")
  .action(async (options) => {
    const config = await loadConfigFile();

    if (!config.config) {
      console.error(
        "[Monicon] No config file found, please create a config file (monicon.config.ts). See https://monicon.dev/docs/configuration for more information."
      );
      process.exit(1);
    }

    bootstrap({ ...config.config, ...options });
  });

cli.version(pkg.version);
cli.help();
cli.parse();
