import React from 'react';
import { SvgXml, XmlProps } from 'react-native-svg';

type Props = {
  icon: string;
  size?: number;
} & Omit<XmlProps, 'xml'>;

type RuntimeProps = Props & {
  isPluginInstalled: boolean;
  svg: string;
};

export const Iconify = ({ size = 24, color = 'black', ...props }: Props) => {
  const runtimeProps = props as RuntimeProps;
  const { isPluginInstalled, svg } = runtimeProps;

  if (!isPluginInstalled) {
    throw new Error(
      'Iconify: You need to install a Babel plugin before using this library. You can continue by adding the following to your babel.config.js'
    );
  }

  if (!svg) {
    return null;
  }

  return (
    <SvgXml xml={svg} height={size} width={size} color={color} {...props} />
  );
};

export default Iconify;
