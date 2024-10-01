import React, { useState, useEffect, ReactNode } from "react";
import { IconifyProps, RuntimeIcon, RuntimeIconifyProps } from "./types";
import { setAttributes } from "./utils";

const isReactNative = async () => {
  try {
    if (typeof navigator === "undefined") return true;

    require("react-native");

    return true;
  } catch (error) {
    return false;
  }
};

const getIcon = (iconName: string) =>
  new Promise<RuntimeIcon>(async (resolve, reject) => {
    try {
      // @ts-ignore
      const iconsImport = await import("oktay");

      const icons = iconsImport ?? iconsImport.default;

      const icon = icons.default[iconName];

      resolve(icon);
    } catch (error) {
      reject(error);
    }
  });

const nativeIcon = async (props: RuntimeIconifyProps) => {
  const { SvgXml } = require("react-native-svg");

  return (
    <SvgXml
      {...props}
      xml={props.icon.svg}
      width={props.icon.width}
      height={props.icon.height}
    />
  );
};

const webIcon = async (props: RuntimeIconifyProps) => {
  // @ts-ignore
  const parse = await import("html-react-parser");

  return parse.default(props.icon.svg);
};

const getComponent = async (props: RuntimeIconifyProps) => {
  const formatted = setAttributes(props);

  const isNative = await isReactNative();

  if (isNative) return nativeIcon(formatted);

  return webIcon(formatted);
};

export const Iconify = (props: IconifyProps) => {
  const [Component, setComponent] = useState<ReactNode | null>(null);

  const renderIcon = async () => {
    const icon = await getIcon(props.name);

    const component = await getComponent({
      ...props,
      icon,
    });

    setComponent(component);
  };

  useEffect(() => {
    renderIcon();
  }, [props]);

  return Component;
};

export default Iconify;
