import React from "react";
import { getIconDetails, IconifyProps } from "@oktaytest/icon-loader";
import { Icon } from "@oktaytest/core";

const importIcons = () =>
  new Promise<Record<string, Icon> | null>(async (resolve) => {
    try {
      // @ts-ignore
      const iconsImport = await import("oktay");
      const icons = iconsImport.default ?? iconsImport;

      return resolve(icons);
    } catch (error) {
      return resolve(null);
    }
  });

export const Iconify = (props: IconifyProps) => {
  const [Component, setComponent] = React.useState<React.ReactElement | null>(
    null
  );

  const loadComponent = React.useCallback(async () => {
    const icons = await importIcons();

    const details = getIconDetails(props, icons ?? {});

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
