declare interface Icon {
  body: string;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  hFlip?: boolean;
  vFlip?: boolean;
  rotate?: number;
  hidden?: boolean;
}

declare var __ICONIFY__: Record<string, Icon> | undefined;
declare var __ICONIFY_PLUGIN_LOADED__: true | undefined;
