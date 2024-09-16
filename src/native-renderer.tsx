import React from 'react';
import { Platform } from 'react-native';

const SvgXml = require('react-native-svg').SvgXml ?? React.Fragment;

import type {
  IconProps,
  IconifyProps,
  NativeIconProps,
  WebIconProps,
} from './types';

import { prepareSvgComponent, prepareSvgIcon } from './utils';

export const WebIcon = (props: WebIconProps) => {
  return prepareSvgComponent(props);
};

export const NativeIcon = (props: NativeIconProps) => {
  return (
    <SvgXml
      xml={props.svg.body}
      width={props.svg.attributes.width}
      height={props.svg.attributes.height}
      {...props}
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

  return <NativeIcon svg={svg} color="red" {...defaultProps} />;
};
