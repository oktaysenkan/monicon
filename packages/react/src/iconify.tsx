import React from "react";
import { getIconDetails, IconifyProps } from "@oktaytest/icon-loader";

// @ts-ignore
import icons from "oktay";

export const Iconify = (props: IconifyProps) => {
  const details = getIconDetails(props, icons);

  return (
    <svg
      {...details.attributes}
      dangerouslySetInnerHTML={{ __html: details.innerHtml }}
    />
  );
};

export default Iconify;
