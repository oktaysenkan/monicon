import { RuntimeIconifyProps } from "./types";

export const setAttributes = (
  props: RuntimeIconifyProps
): RuntimeIconifyProps => {
  const ratio = props.icon.width / props.icon.height;

  let svg = props.icon.svg;

  const height = props.size ? props.size : props.icon.height;
  const width = props.size ? props.size * ratio : props.icon.width;

  svg = svg
    .replace(/width="([^"]+)"/, `width="${width}"`)
    .replace(/height="([^"]+)"/, `height="${height}"`);

  if (props.color) {
    svg = svg.replace(/fill="([^"]+)"/, `fill="${props.color}"`);
  }

  return {
    ...props,
    icon: {
      ...props.icon,
      svg,
      height,
      width,
    },
  };
};
