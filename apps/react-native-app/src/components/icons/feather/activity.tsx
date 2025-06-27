import React from "react";
import { SvgXml, type SvgProps } from "react-native-svg";

export const ActivityIcon = (props: Omit<SvgProps, "xml">) => {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;

  return <SvgXml xml={xml} {...props} />;
};

export default ActivityIcon;
