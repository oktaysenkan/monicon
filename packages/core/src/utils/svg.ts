import { JSDOM } from "jsdom";
import { parseSync, stringify } from "svgson";
import type { CollectionIcon } from "../types";

export const toPx = (value: string) => {
  if (value.endsWith("em")) {
    return parseFloat(value) * 16;
  }

  return parseFloat(value);
};

export const transformIcon = (svg: string) => {
  const svgObject = parseSync(svg);

  const viewBox = svgObject.attributes?.viewBox;

  const [, , widthAsString, heightAsString] = viewBox?.split(" ") ?? [];

  const width = toPx(widthAsString ?? "1em");
  const height = toPx(heightAsString ?? "1em");

  const body = svgObject.children
    .map((child) => stringify(child, { selfClose: false }))
    .join("");

  return {
    svg,
    body,
    width: width,
    height: height,
  };
};

/**
 * Create an SVG from the icon body
 * @param icon - The icon to create the SVG from
 * @returns The SVG
 */
export const createSvg = (icon: Required<CollectionIcon>) => {
  const { window } = new JSDOM();
  const parser = new window.DOMParser();

  const viewBox = `0 0 ${icon.width} ${icon.height}`;

  const dom = parser.parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${icon.body}</svg>`,
    "image/svg+xml"
  );

  return dom.documentElement.outerHTML;
};
