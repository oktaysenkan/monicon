import React from 'react';
import { SvgXml, XmlProps } from 'react-native-svg';

type Props = {
  icon: string;
  size?: number;
  svg?: string;
} & Omit<XmlProps, 'xml'>;

export const Icon = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  icon,
  size = 24,
  color = 'black',
  svg,
  ...props
}: Props) => {
  return <SvgXml xml={svg!} height={size} color={color} {...props} />;
};

export default Icon;
