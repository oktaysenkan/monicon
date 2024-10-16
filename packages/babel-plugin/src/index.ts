import type * as b from "@babel/core";
import {
  getIconsFilePath,
  getResolveAlias,
  MoniconBundlerOptions,
} from "@monicon/core";

const alias = getResolveAlias();

export default ({ types: t }: typeof b): b.PluginObj => {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value === alias) {
          path.node.source.value = getIconsFilePath({
            type: "cjs",
            ...(this.opts as MoniconBundlerOptions),
          });
        }
      },
      CallExpression(path) {
        const { callee, arguments: args } = path.node;

        const isFunctionImport =
          t.isIdentifier(callee, { name: "import" }) ||
          t.isIdentifier(callee, { name: "require" }) ||
          t.isImport(callee);

        const firstArg = args?.[0];

        const isImportingIcons =
          args.length === 1 &&
          t.isStringLiteral(firstArg) &&
          firstArg.value === alias;

        if (isFunctionImport && isImportingIcons && firstArg) {
          firstArg.value = getIconsFilePath({
            type: "cjs",
            ...(this.opts as MoniconBundlerOptions),
          });
        }
      },
    },
  };
};
