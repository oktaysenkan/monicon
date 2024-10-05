export interface IconifyProps {
  name: string;
  size?: number;
  color?: string;
}

export interface RuntimeIcon {
  svg: string;
  width: number;
  height: number;
}

export interface RuntimeIconifyProps extends IconifyProps {
  icon: RuntimeIcon;
}
