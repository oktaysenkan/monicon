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

  const svg = useMemo(() => {
    if (!iconData) {
      return null;
    }

    const iconBuildResult = iconToSVG(iconData, {
      height: size,
    });

    return {
      ...iconBuildResult,
      body: iconToHTML(iconBuildResult.body, iconBuildResult.attributes),
    };
  }, [size, iconData]);

  if (!isPluginInstalled) {
    throw new Error(
      'Iconify: You need to install a Babel plugin before using this library. You can continue by adding the following to your babel.config.js'
    );
  }

  if (!iconData || !svg || !svg.body) {
    return null;
  }

  return (
    <SvgXml
      xml={svg.body}
      height={svg.attributes.height}
      width={svg.attributes.width}
      color={color}
      {...props}
    />
  );
};

export default Iconify;
