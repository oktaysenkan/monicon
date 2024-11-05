import React from "react";
import { getIconDetails, MoniconProps } from "@monicon/icon-loader";

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
    <svg
      {...details.attributes}
      dangerouslySetInnerHTML={{ __html: details.innerHtml }}
    />
  );
};

export default Monicon;
