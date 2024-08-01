import React from 'react';
import {
  type IconifyIconBuildResult,
  iconToHTML,
  iconToSVG,
} from '@iconify/utils';
import parse from 'html-react-parser';
import type { SvgXml } from 'react-native-svg';
import { Platform } from 'react-native';

import type {
  IconProps,
  IconifyProps,
  NativeIconProps,
  WebIconProps,
} from './types';

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

export const WebIcon = (props: WebIconProps) => {
  const svgAsHtml = props.color
    ? props.svg.body.replace(
        /<svg([^>]*)>/,
        `<svg$1 style="color: ${String(props.color)};">`
      )
    : props.svg.body;

  return <>{parse(svgAsHtml)}</>;
};

export const NativeIcon = (props: NativeIconProps) => {
  const [Component, setComponent] = React.useState<typeof SvgXml>();

  const loadComponent = async () => {
    const { SvgXml } = await import('react-native-svg');
    setComponent(() => SvgXml);
  };

  React.useEffect(() => {
    loadComponent();
  }, []);

  if (!Component) return null;

  return (
    <Component
      xml={props.svg.body}
      width={props.svg.attributes.width}
      height={props.svg.attributes.height}
    />
  );
};

export const Icon = (props: IconProps) => {
  const defaultProps: IconifyProps = {
    size: 24,
    color: 'currentColor',
    ...props,
  };

  const svg = prepareSvgIcon(props.iconData, defaultProps);

  if (!props.icon || !svg || !svg.body) return null;

  if (Platform.OS === 'web') return <WebIcon svg={svg} {...defaultProps} />;

  return <NativeIcon svg={svg} {...defaultProps} />;
};
