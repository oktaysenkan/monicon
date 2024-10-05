import React from "react";

import { IconifyProps, RuntimeIcon, RuntimeIconifyProps } from "./types";
import { setAttributes } from "./utils";

const getIcon = (iconName: string) =>
  new Promise<RuntimeIcon>(async (resolve, reject) => {
    try {
      // todo: add error handling
      // @ts-ignore
      const iconsImport = await import("oktay");

      const icons = iconsImport.default ?? iconsImport;

      let icon = icons[iconName];

      if (!icon) {
        console.warn(
          `[Iconify] The icon "${iconName}" is missing from the configuration. To resolve this, ensure it is added to the 'icons' array within the Iconify plugin's configuration.`
        );

        // @ts-ignore
        const constantsImport = await import("@oktaytest/core/constants");

        const constants = constantsImport.default ?? constantsImport;

        const fallbackIcon = constants.fallbackIcon;

        icon = fallbackIcon;
      }

      resolve(icon);
    } catch (error) {
      reject(error);
    }
  });

const webIcon = async (props: RuntimeIconifyProps) => {
  // @ts-ignore
  const parse = await import("html-react-parser");

  return parse.default(props.icon.svg);
};

const getComponent = async (props: RuntimeIconifyProps) => {
  const formatted = setAttributes(props);

  return webIcon(formatted);
};

export const Iconify = (props: IconifyProps) => {
  const [Component, setComponent] = React.useState<React.ReactNode | null>(
    null
  );

  const renderIcon = async () => {
    const icon = await getIcon(props.name);

    const component = await getComponent({
      ...props,
      icon,
    });

    setComponent(component);
  };

  React.useEffect(() => {
    renderIcon();
  }, [props]);

  return Component;
};

export default Iconify;
