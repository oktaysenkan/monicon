import { component$ } from "@builder.io/qwik";
import { getIconDetails, MoniconProps } from "@monicon/icon-loader";

export const Monicon = component$((props: MoniconProps) => {
  const details = getIconDetails({
    name: props.name,
    size: props.size,
    color: props.color,
    strokeWidth: props.strokeWidth,
  });

  return (
    <svg {...details.attributes} dangerouslySetInnerHTML={details.innerHtml} />
  );
});

export default Monicon;
