import React from "react";
import { getIconDetails, MoniconProps } from "@monicon/icon-loader";

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

    setComponent(
      <svg
        {...details.attributes}
        dangerouslySetInnerHTML={{ __html: details.innerHtml }}
      />
    );
  }, [props.name, props.size, props.color, props.strokeWidth]);

  React.useEffect(() => {
    loadComponent();
  }, [loadComponent]);

  return Component;
});

export default Monicon;
