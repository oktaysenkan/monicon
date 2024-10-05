import React from "react";
import { getIconDetails, IconifyProps } from "@oktaytest/icon-loader";

const isReactNative = async () => {
  try {
    if (typeof navigator === "undefined") return true;

    require("react-native");

    return true;
  } catch (error) {
    return false;
  }
};

const nativeIcon = async (props: ReturnType<typeof getIconDetails>) => {
  const { SvgXml } = require("react-native-svg");

  return (
    <SvgXml
      {...props}
      xml={props.svg}
      width={props.attributes.width}
      height={props.attributes.height}
    />
  );
};

const webIcon = async (props: ReturnType<typeof getIconDetails>) => {
  return (
    <svg
      {...props.attributes}
      dangerouslySetInnerHTML={{ __html: props.innerHtml }}
    />
  );
};

const getComponent = async (props: ReturnType<typeof getIconDetails>) => {
  const isNative = await isReactNative();

  if (isNative) return nativeIcon(props);

  return webIcon(props);
};

export const Iconify = (props: IconifyProps) => {
  const [Component, setComponent] = React.useState<React.ReactNode | null>(
    null
  );

  const renderIcon = async () => {
    // @ts-ignore
    const iconsImport = await import("oktay");

    const icons = iconsImport.default ?? iconsImport;

    const details = getIconDetails(props, icons);

    const component = await getComponent(details);

    setComponent(component);
  };

  React.useEffect(() => {
    renderIcon();
  }, [props]);

  return Component;
};

export default Iconify;
