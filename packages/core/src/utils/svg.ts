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

  const width = toPx(svgObject.attributes.width ?? "1em");
  const height = toPx(svgObject.attributes.height ?? "1em");

  const body = svgObject.children.map((child) => stringify(child)).join("");

  return {
    svg,
    width: width,
    height: height,
    body,
  };
};

/**
 * Create an SVG from the icon body
 * @param icon - The icon to create the SVG from
 * @returns The SVG
 */
export const createSvg = (icon: Required<CollectionIcon>) => {
  const { window } = new JSDOM();

  const svg = window.document.createElement("svg");

  const viewBox = `0 0 ${icon.width} ${icon.height}`;

  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", icon.width.toString());
  svg.setAttribute("height", icon.height.toString());
  svg.setAttribute("viewBox", viewBox);

  svg.innerHTML = icon.body;

  return svg.outerHTML;
};
