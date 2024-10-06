export const toPx = (value: string) => {
  if (value.endsWith("em")) {
    return parseFloat(value) * 16;
  }

  return parseFloat(value);
};
