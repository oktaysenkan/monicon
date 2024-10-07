import React from "react";
import {
  getIconDetails,
  MoniconProps as LoaderProps,
} from "@monicon/icon-loader";
import { Icon } from "@monicon/core";
import type { XmlProps } from "react-native-svg";

export interface MoniconProps extends LoaderProps, Omit<XmlProps, "xml"> {
  name: LoaderProps["name"];
  color?: LoaderProps["color"];
  webProps?: React.SVGProps<SVGSVGElement>;
}

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

const nativeIcon = async (
  details: ReturnType<typeof getIconDetails>,
  props: Partial<MoniconProps>
) => {
  const { SvgXml } = require("react-native-svg");

  return (
    <SvgXml
      {...details}
      xml={details.svg}
      width={details.attributes.width}
      height={details.attributes.height}
      {...props}
    />
  );
};

const webIcon = async (
  details: ReturnType<typeof getIconDetails>,
  props: Partial<MoniconProps>
) => {
  return (
    <svg
      {...details.attributes}
      {...props.webProps}
      dangerouslySetInnerHTML={{ __html: details.innerHtml }}
    />
  );
};

const getComponent = async (
  details: ReturnType<typeof getIconDetails>,
  props: Partial<MoniconProps>
) => {
  const isNative = await isReactNative();

  if (isNative) return nativeIcon(details, props);

  return webIcon(details, props);
};

export const Monicon = React.memo((props: MoniconProps) => {
  const [Component, setComponent] = React.useState<React.ReactNode | null>(
    null
  );

  const renderIcon = React.useCallback(async () => {
    const icons = await importIcons();

    const details = getIconDetails(props, icons ?? {});

    const component = await getComponent(details, props);

    setComponent(component);
  }, [props]);

  React.useEffect(() => {
    renderIcon();
  }, [props]);

  return Component;
});

export default Monicon;
