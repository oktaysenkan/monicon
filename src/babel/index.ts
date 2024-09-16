import type * as b from '@babel/core';
import { loadIcons, setPluginInstalled } from './utils';

export default (_babel: typeof b): b.PluginObj => {
  return {
    visitor: {},
    pre() {
      setPluginInstalled(this);
    },
    post() {
      loadIcons(this);
    },
  };
};
