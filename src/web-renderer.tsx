import React from 'react';

import type { IconProps, IconifyProps, WebIconProps } from './types';

import { prepareSvgComponent, prepareSvgIcon } from './utils';

export const WebIcon = (props: WebIconProps) => {
  return prepareSvgComponent(props);
};

export const Icon = (props: IconProps) => {
  const defaultProps: IconifyProps = {
    size: 24,
    color: 'currentColor',
    ...props,
  };

  const svg = prepareSvgIcon(props.iconData, defaultProps);

  if (!props.icon || !svg || !svg.body) return null;

  return <WebIcon svg={svg} {...defaultProps} />;
};
