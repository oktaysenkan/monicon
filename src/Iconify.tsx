import { FullExtendedIconifyIcon, iconToHTML, iconToSVG } from '@iconify/utils';
import React, { useMemo } from 'react';
import { SvgXml, XmlProps } from 'react-native-svg';

type Props = {
  icon: string;
  size?: number;
} & Omit<XmlProps, 'xml'>;

type RuntimeProps = Props & {
  isPluginInstalled: boolean;
  iconData: FullExtendedIconifyIcon;
};

export const Iconify = ({ size = 24, color = 'black', ...props }: Props) => {
  const runtimeProps = props as RuntimeProps;
  const { isPluginInstalled, iconData } = runtimeProps;

  const renderData = useMemo(() => {
    if (!iconData) {
      return null;
    }

    return iconToSVG(iconData, {
      height: size,
    });
  }, [size, iconData]);

  const svg = useMemo(() => {
    if (!renderData) {
      return null;
    }

    return iconToHTML(renderData.body, renderData.attributes);
  }, [renderData]);

  if (!isPluginInstalled) {
    throw new Error(
      'Iconify: You need to install a Babel plugin before using this library. You can continue by adding the following to your babel.config.js'
    );
  }

  if (!iconData || !renderData || !svg) {
    return null;
  }

  return (
    <SvgXml
      xml={svg}
      height={renderData.attributes.height}
      width={renderData.attributes.width}
      color={color}
      {...props}
    />
  );
};

export default Iconify;
