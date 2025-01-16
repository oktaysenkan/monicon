import React from "react";
import {
  getIconDetails,
  MoniconProps,
  camelCasedProps,
} from "@monicon/icon-loader";

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

  const attributes = React.useMemo(
    () => camelCasedProps(details.attributes),
    [details.attributes]
  );

  return (
    <svg
      {...attributes}
      dangerouslySetInnerHTML={{ __html: details.innerHtml }}
    />
  );
};

export default Monicon;
