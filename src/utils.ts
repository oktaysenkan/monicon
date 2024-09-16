import {
  type IconifyIconBuildResult,
  iconToHTML,
  iconToSVG,
} from '@iconify/utils';
import parse from 'html-react-parser';

import type { IconifyProps, WebIconProps } from './types';

export const prepareSvgIcon = (
  iconData: Icon,
  props: IconifyProps
): IconifyIconBuildResult => {
  const iconBuildResult = iconToSVG(iconData, {
    height: props.size,
  });

  return {
    ...iconBuildResult,
    body: iconToHTML(iconBuildResult.body, iconBuildResult.attributes),
  };
};

export const prepareSvgComponent = (props: WebIconProps) => {
  const svgAsHtml = props.color
    ? props.svg.body.replace(
        /<svg([^>]*)>/,
        `<svg$1 style="color: ${String(props.color)};">`
      )
    : props.svg.body;

  return parse(svgAsHtml);
};
