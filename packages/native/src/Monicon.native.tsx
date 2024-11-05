import React from "react";
import { getIconDetails, MoniconProps } from "@monicon/icon-loader";
import { SvgXml } from "react-native-svg";

export const Monicon = (props: MoniconProps) => {
  const details = React.useMemo(
    () =>
      getIconDetails({
        name: props.name,
        size: props.size,
        color: props.color,
        strokeWidth: props.strokeWidth,
      }),
    [props.name, props.size, props.color, props.strokeWidth]
  );

  return (
    <SvgXml
      xml={details.svg}
      width={details.attributes.width}
      height={details.attributes.height}
    />
  );
};

export default Monicon;
