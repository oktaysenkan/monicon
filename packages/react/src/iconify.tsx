import React from "react";
import { getIconDetails, IconifyProps } from "@oktaytest/icon-loader";

export const Iconify = (props: IconifyProps) => {
  const [Component, setComponent] = React.useState<React.ReactElement | null>(
    null
  );

  const loadComponent = React.useCallback(async () => {
    // @ts-ignore
    const iconsImport = await import("oktay");

    const icons = iconsImport.default ?? iconsImport;

    const details = getIconDetails(props, icons);

    setComponent(
      <svg
        {...details.attributes}
        dangerouslySetInnerHTML={{ __html: details.innerHtml }}
      />
    );
  }, [props]);

  React.useEffect(() => {
    loadComponent();
  }, []);

  return Component;
};

export default Iconify;
