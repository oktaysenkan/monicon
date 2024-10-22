import React from "react";
import {
  getIconDetails,
  IconDetails,
  MoniconProps,
} from "@monicon/icon-loader";

const isReactNative = async () => {
  try {
    return Boolean(typeof window && typeof window?.document);
  } catch (error) {
    return false;
  }
};

const nativeIcon = async (details: IconDetails) => {
  const RNSvg = require("react-native-svg");

  return (
    <RNSvg.SvgXml
      {...details}
      xml={details.svg}
      width={details.attributes.width}
      height={details.attributes.height}
    />
  );
};

const webIcon = async (details: IconDetails) => {
  return (
    <svg
      {...details.attributes}
      dangerouslySetInnerHTML={{ __html: details.innerHtml }}
    />
  );
};

const getComponent = async (details: IconDetails) => {
  const isNative = await isReactNative();

  if (isNative) return nativeIcon(details);

  return webIcon(details);
};

export const Monicon = React.memo((props: MoniconProps) => {
  const [Component, setComponent] = React.useState<React.ReactNode | null>(
    null
  );

  const loadComponent = React.useCallback(async () => {
    const details = await getIconDetails({
      name: props.name,
      size: props.size,
      color: props.color,
      strokeWidth: props.strokeWidth,
    });

    const component = await getComponent(details);

    setComponent(component);
  }, [props.name, props.size, props.color, props.strokeWidth]);

  React.useEffect(() => {
    loadComponent();
  }, [loadComponent]);

  return Component;
});

export default Monicon;
