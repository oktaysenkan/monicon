import React from "react";
import { SvgXml, type SvgProps } from "react-native-svg";

const HomeIcon = (props: Omit<SvgProps, "xml">) => {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>`;

  return <SvgXml xml={xml} {...props} />;
};

export default HomeIcon;
