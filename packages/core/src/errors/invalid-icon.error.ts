const InvalidIcon = (iconName: string) =>
  new Error(
    `[React Native Iconify]

Icon "${iconName}" is not a valid icon.`
  );

export default InvalidIcon;
