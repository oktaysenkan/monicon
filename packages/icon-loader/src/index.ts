import { Icon } from "@monicon/core";
import { parseSync, stringify } from "svgson";
import _ from "lodash";
import type { CamelCasedPropertiesDeep } from "type-fest";

// @ts-ignore
import icons from "@monicon/runtime";

export type MoniconProps = {
  /**
   * The name of the icon to render.
   *
   * @example "mdi:home"
   *
   * For TypeScript users, you must check below for more information.
   *
   * @link https://monicon-docs.vercel.app/troubleshooting/typescript
   */
  name: string;
  /**
   * The size of the icon.
   *
   * @default collection's view box size
   */
  size?: number;
  /**
   * The color of the icon.
   *
   * @default "currentColor"
   */
  color?: string;
  /**
   * The stroke width of the icon. This feature is only available for limited icon collections.
   */
  strokeWidth?: number;
};

export type IconDetails = {
  innerHtml: string;
  attributes: Record<string, string>;
  svg: string;
};

export const fallbackIcon: Icon = {
  svg: '<svg width="32" height="32" viewBox="0 0 24 24" > <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-1-5h2v2h-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1a1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355" /> </svg>',
  body: '<path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-1-5h2v2h-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1a1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355" />',
  width: 32,
  height: 32,
};

const loadIcon = (iconName: string) => {
  const icon = icons?.[iconName];

  if (icon) return icon;

  console.warn(
    `[Monicon] The icon "${iconName}" is missing from the configuration. To resolve this, ensure it is added to the 'icons' array within the Monicon plugin's configuration.`
  );

  return fallbackIcon;
};

export const getIconDetails = (props: MoniconProps) => {
  const loadedIcon = loadIcon(props.name);

  const icon = { ...loadedIcon };

  if (props.strokeWidth) {
    icon.svg = icon.svg.replace(
      /stroke-width="[^"]*"/,
      `stroke-width="${props.strokeWidth}"`
    );
  }

  const parsed = parseSync(icon.svg);

  if (props.color) {
    parsed.attributes.color = props.color;
  }

  let innerHtml = parsed.children.map((child) => stringify(child)).join("");

  const ratio = icon.width / icon.height;

  const height = props.size ? props.size : icon.height;

  const width = props.size ? props.size * ratio : icon.width;

  const attributes: Record<string, string> = {
    ...parsed.attributes,
    width: `${width}px`,
    height: `${height}px`,
  };

  parsed.attributes = attributes;

  const svg = stringify(parsed);

  return {
    innerHtml,
    attributes,
    svg,
  } satisfies IconDetails;
};

export const camelCasedProps = <T extends object>(props: T) => {
  const camelCasedProps = {} as CamelCasedPropertiesDeep<T>;

  Object.entries(props).forEach(([key, value]) => {
    const propName = _.camelCase(key) as keyof CamelCasedPropertiesDeep<T>;

    camelCasedProps[propName] = value as any;
  });

  return camelCasedProps;
};
