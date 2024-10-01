import type * as b from "@babel/core";
import { getIconsFilePath } from "@oktaytest/core";

export default (_babel: typeof b): b.PluginObj => {
  const { types: t } = _babel;

  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value === "oktay") {
          path.node.source.value = getIconsFilePath("commonjs");
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
          firstArg.value === "oktay";

        if (isFunctionImport && isImportingIcons && firstArg) {
          firstArg.value = getIconsFilePath("commonjs");
        }
      },
    },
  };
};
