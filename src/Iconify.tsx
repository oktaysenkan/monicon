import { FullExtendedIconifyIcon } from '@iconify/utils';
import { XmlProps } from 'react-native-svg';
import { renderIcon } from './icon';

type Props = {
  icon: string | TemplateStringsArray;
  size?: number;
} & Omit<XmlProps, 'xml'>;

export type RuntimeProps = Props & {
  isPluginInstalled: boolean;
  iconData: FullExtendedIconifyIcon;
};

export const Iconify = (props: Props) => {
  const runtimeProps = props as RuntimeProps;
  const { isPluginInstalled } = runtimeProps;

  if (!isPluginInstalled) {
    throw new Error(
      'Iconify: You need to install a Babel plugin before using this library. You can continue by adding the following to your babel.config.js'
    );
  }

  return renderIcon(runtimeProps);
};

export default Iconify;
