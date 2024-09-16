import React from 'react';

import IconNotFoundError from './errors/icon-not-found.error';
import PluginNotInstalledError from './errors/plugin-not-installed.error';
import { WebIcon } from './web-renderer';
import type { IconifyProps } from './types';
import { prepareSvgIcon } from './utils';

/**
 * Icon component
 * @param {string} icon - Icon name
 * @returns {React.ReactElement}
 * @example
 * <Icon icon="mdi:home" color="black" />
 */
export const Iconify = (props: IconifyProps) => {
  const icons = globalThis.__ICONIFY__;
  const isPluginInstalled = globalThis.__ICONIFY_PLUGIN_LOADED__;

  const defaultProps: IconifyProps = {
    size: 24,
    color: 'currentColor',
    ...props,
  };

  if (!isPluginInstalled) throw PluginNotInstalledError();

  const iconData = icons?.[props.icon];

  if (!iconData) {
    throw IconNotFoundError(props.icon);
  }

  const svg = prepareSvgIcon(iconData, defaultProps);

  return <WebIcon svg={svg} {...defaultProps} />;
};

export default Iconify;
