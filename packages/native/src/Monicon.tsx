import React from "react";
import { getIconDetails, MoniconProps } from "@monicon/icon-loader";
import { Icon } from "@monicon/core";

const importIcons = () =>
  new Promise<Record<string, Icon> | null>(async (resolve) => {
    try {
      // @ts-ignore
      const iconsImport = await import("@monicon/runtime");
      const icons = iconsImport.default ?? iconsImport;

      return resolve(icons);
    } catch (error) {
      return resolve(null);
    }
  });

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

export const Monicon = (props: MoniconProps) => {
  const [Component, setComponent] = React.useState<React.ReactNode | null>(
    null
  );

  const renderIcon = async () => {
    const icons = await importIcons();

    const details = getIconDetails(props, icons ?? {});

    const component = await getComponent(details);

    setComponent(component);
  };

  React.useEffect(() => {
    renderIcon();
  }, [props]);

  return Component;
};

export default Monicon;
