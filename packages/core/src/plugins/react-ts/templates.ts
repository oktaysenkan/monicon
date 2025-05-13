const tsxTemplate = `import React from "react";

export const <%= it.name %> = (props: React.ComponentPropsWithoutRef<"svg">) => {
  return <%= it.code %>
};

export default <%= it.name %>;`;

const jsxTemplate = `import React from "react";

export const <%= it.name %> = (props) => {
  return <%= it.code %>
};

export default <%= it.name %>;`;

const templates = {
  tsx: tsxTemplate,
  jsx: jsxTemplate,
};

export default templates;
