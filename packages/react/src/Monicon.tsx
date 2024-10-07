import React from "react";
import {
  getIconDetails,
  MoniconProps as LoaderProps,
} from "@monicon/icon-loader";
import { Icon } from "@monicon/core";

// extends svg props
interface MoniconProps
  extends LoaderProps,
    Omit<React.SVGProps<SVGSVGElement>, "name"> {}

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

export const Monicon = (props: MoniconProps) => {
  const [Component, setComponent] = React.useState<React.ReactElement | null>(
    null
  );

  const loadComponent = React.useCallback(async () => {
    const icons = await importIcons();

    const details = getIconDetails(
      { name: props.name, size: props.size, color: props.color },
      icons ?? {}
    );

    setComponent(
      <svg
        {...details.attributes}
        {...props}
        dangerouslySetInnerHTML={{ __html: details.innerHtml }}
      />
    );
  }, [props]);

  React.useEffect(() => {
    loadComponent();
  }, [props]);

  return Component;
};

export default Monicon;
