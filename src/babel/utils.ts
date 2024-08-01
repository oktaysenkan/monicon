import * as b from '@babel/core';
import {
  getIconData,
  stringToIcon,
  type PartialExtendedIconifyIcon,
} from '@iconify/utils';
import { type IconifyJSON } from '@iconify/types';
import { locate } from '@iconify/json';

import type { PluginOptions } from './types';
import IconNotFoundError from '../errors/icon-not-found.error';

const iconsAsObject: Record<string, PartialExtendedIconifyIcon> = {};
const collectionsAsObject: Record<string, IconifyJSON> = {};

export const isIconifyFile = (plugin: b.PluginPass) =>
  plugin.filename?.includes('Iconify') &&
  plugin.file.code.includes('@@iconify-code-gen');

export const loadIcon = (iconName: string) => {
  const iconDetails = stringToIcon(iconName);

  if (!iconDetails) throw IconNotFoundError(iconName);

  const collectionPath = locate(iconDetails.prefix);

  const collectionExists = collectionsAsObject[iconDetails.prefix];

  if (!collectionExists) {
    collectionsAsObject[iconDetails.prefix] = require(
      collectionPath as string
    ) as IconifyJSON;
  }

  const collection = collectionsAsObject[iconDetails.prefix]!;

  const icon = getIconData(collection, iconDetails.name);

  if (!icon) throw IconNotFoundError(iconName);

  iconsAsObject[iconName] = icon;

  return icon;
};

export const loadIcons = (plugin: b.PluginPass) => {
  const { icons } = plugin.opts as PluginOptions;

  if (!isIconifyFile(plugin)) return;

  Array.from(new Set(icons)).forEach(loadIcon);

  const ast = b.template.ast(
    `global.__ICONIFY__ = ${JSON.stringify(iconsAsObject)}`
  ) as b.types.Statement;

  plugin.file.path.node.body.unshift(ast);
};

export const setPluginInstalled = (plugin: b.PluginPass) => {
  const ast = b.template.ast(
    `global.__ICONIFY_PLUGIN_LOADED__ = true;`
  ) as b.types.Statement;

  plugin.file.path.node.body.unshift(ast);
};
