import React from 'react';
import { Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  type IconifyIconBuildResult,
  iconToHTML,
  iconToSVG,
} from '@iconify/utils';
import parse from 'html-react-parser';
import type { IconifyProps } from './Iconify';

const prepareSvgIcon = (
  icon: Icon,
  props: IconifyProps
): IconifyIconBuildResult => {
  const iconBuildResult = iconToSVG(icon, {
    height: props.size,
  });

  return {
    ...iconBuildResult,
    body: iconToHTML(iconBuildResult.body, iconBuildResult.attributes),
  };
};

export const renderWebIcon = (
  svg: IconifyIconBuildResult,
  props: IconifyProps
) => {
  const svgAsHtml = props.color
    ? svg.body.replace(
        /<svg([^>]*)>/,
        `<svg$1 style="color: ${String(props.color)};">`
      )
    : svg.body;

  return <>{parse(svgAsHtml)}</>;
};

export const renderNativeIcon = (
  svg: IconifyIconBuildResult,
  props: IconifyProps
) => {
  return (
    <SvgXml
      xml={svg.body}
      height={svg.attributes.height}
      width={svg.attributes.width}
      color={props.color}
      {...props}
    />
  );
};

export const renderIcon = (icon: Icon, props: IconifyProps) => {
  const defaultProps: IconifyProps = {
    size: 24,
    color: 'currentColor',
    ...props,
  };

  const svg = prepareSvgIcon(icon, defaultProps);

  if (!icon || !svg || !svg.body) return null;

  if (Platform.OS === 'web') return renderWebIcon(svg, defaultProps);

  return renderNativeIcon(svg, defaultProps);
};
