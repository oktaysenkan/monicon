const tsxTemplate = `import React from "react";
import { SvgXml, type SvgProps } from "react-native-svg";

export const <%= it.name %> = (props: Omit<SvgProps, "xml">) => {
  const xml = \`<%= it.code %>\`;

  return <SvgXml xml={xml} {...props} />;
};

export default <%= it.name %>;`;

const jsxTemplate = `import React from "react";
import { SvgXml } from "react-native-svg";

export const <%= it.name %> = (props) => {
  const xml = \`<%= it.code %>\`;

  return <SvgXml xml={xml} {...props} />;
};

export default <%= it.name %>;`;

const templates = {
  tsx: tsxTemplate,
  jsx: jsxTemplate,
};

export default templates;
