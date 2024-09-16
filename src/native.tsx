import React from 'react';

import IconNotFoundError from './errors/icon-not-found.error';
import PluginNotInstalledError from './errors/plugin-not-installed.error';
import { Icon } from './native-renderer';
import type { IconifyProps } from './types';

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

  if (!isPluginInstalled) throw PluginNotInstalledError();

  const iconData = icons?.[props.icon];

  if (!iconData) {
    if (!__DEV__) return null;

    throw IconNotFoundError(props.icon);
  }

  return <Icon iconData={iconData} {...props} />;
};

export default Iconify;
