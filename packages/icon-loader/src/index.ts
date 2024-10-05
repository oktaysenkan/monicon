import { Icon } from "@monicon/core";
import { parseSync, stringify } from "svgson";

export type IconifyProps = {
  name: string;
  size?: number;
  color?: string;
};

export type GetIconDetailsOptions = {
  icon: Icon;
  props: IconifyProps;
};

export const fallbackIcon: Icon = {
  svg: '<svg width="32" height="32" viewBox="0 0 24 24" > <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-1-5h2v2h-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1a1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355" /> </svg>',
  width: 32,
  height: 32,
};

const loadIcon = (iconName: string, icons: Record<string, Icon>) => {
  const icon = icons?.[iconName];

  if (icon) return icon;

  console.warn(
    `[Iconify] The icon "${iconName}" is missing from the configuration. To resolve this, ensure it is added to the 'icons' array within the Iconify plugin's configuration.`
  );

  return fallbackIcon;
};

export const getIconDetails = (
  props: IconifyProps,
  icons: Record<string, Icon>
) => {
  const icon = loadIcon(props.name, icons);

  const parsed = parseSync(icon.svg);

  let innerHtml = parsed.children.map((child) => stringify(child)).join("");

  if (props.color) {
    innerHtml = innerHtml.replace(/fill="([^"]+)"/, `fill="${props.color}"`);
  }

  const ratio = icon.width / icon.height;

  const height = props.size ? props.size : icon.height;

  const width = props.size ? props.size * ratio : icon.width;

  const attributes: Record<string, string> = {
    ...parsed.attributes,
    width: `${width}px`,
    height: `${height}px`,
  };

  parsed.attributes = attributes;

  icon.svg = icon.svg
    .replace(/width="([^"]+)"/, `width="${width}"`)
    .replace(/height="([^"]+)"/, `height="${height}"`);

  if (props.color) {
    icon.svg = icon.svg.replace(/fill="([^"]+)"/, `fill="${props.color}"`);
  }

  return {
    innerHtml,
    attributes,
    svg: icon.svg,
  };
};
