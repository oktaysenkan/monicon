import React from "react";
import { getIconDetails } from "@oktaytest/icon-loader";

import { IconifyProps } from "./types";

export const Iconify = (props: IconifyProps) => {
  const details = getIconDetails(props);

  return (
    <svg
      {...details.attributes}
      dangerouslySetInnerHTML={{ __html: details.innerHtml }}
    />
  );
};

export default Iconify;
