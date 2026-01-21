import React from "react";
import { SvgXml, type SvgProps } from "react-native-svg";

const AlertCircleIcon = (props: Omit<SvgProps, "xml">) => {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></g></svg>`;

  return <SvgXml xml={xml} {...props} />;
};

export default AlertCircleIcon;
