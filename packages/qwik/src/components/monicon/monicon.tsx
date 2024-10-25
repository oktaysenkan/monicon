import { component$, useResource$, Resource } from "@builder.io/qwik";
import { getIconDetails, MoniconProps } from "@monicon/icon-loader";

export const Monicon = component$((props: MoniconProps) => {
  const iconResource = useResource$(async ({ track }) => {
    track(() => props.name);
    track(() => props.size);
    track(() => props.color);
    track(() => props.strokeWidth);

    const details = await getIconDetails({
      name: props.name,
      size: props.size,
      color: props.color,
      strokeWidth: props.strokeWidth,
    });

    return details;
  });

  return (
    <Resource
      value={iconResource}
      onResolved={(details) => (
        <svg
          {...details.attributes}
          dangerouslySetInnerHTML={details.innerHtml}
        />
      )}
    />
  );
});

export default Monicon;
