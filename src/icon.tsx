import React from 'react';
import { Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { IconifyIconBuildResult, iconToHTML, iconToSVG } from '@iconify/utils';
import parse from 'html-react-parser';
import { RuntimeProps } from './Iconify';

export type SVGIcon = IconifyIconBuildResult & {
  body: string;
};

const prepareSvgIcon = ({ iconData, size }: RuntimeProps): SVGIcon => {
  const iconBuildResult = iconToSVG(iconData, {
    height: size,
  });

  return {
    ...iconBuildResult,
    body: iconToHTML(iconBuildResult.body, iconBuildResult.attributes),
  };
};

export const renderWebIcon = (svg: SVGIcon, props: RuntimeProps) => {
  const svgAsHtml = props.color
    ? svg.body.replace(
        /<svg([^>]*)>/,
        `<svg$1 style="color: ${String(props.color)};">`
      )
    : svg.body;

  return <>{parse(svgAsHtml)}</>;
};

export const renderNativeIcon = (svg: SVGIcon, props: RuntimeProps) => {
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

export const renderIcon = (props: RuntimeProps) => {
  const svg = prepareSvgIcon(props);

  if (!props.iconData || !svg || !svg.body) {
    return null;
  }

  if (Platform.OS === 'web') {
    return renderWebIcon(svg, props);
  }

  return renderNativeIcon(svg, props);
};
