const IconNotFoundError = (iconName: string, prefix: string) =>
  new Error(
    `[React Native Iconify]
  
Icon "${iconName}" not found in collection "${prefix}".`
  );

export default IconNotFoundError;
