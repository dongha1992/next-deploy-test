const zIndexMap: { [k: string]: string } = {
  fixedBottom: "100",
  fullScreen: "100",
  lottie: "101",
  settingButton: "9",
  popup: "10",
};

const getZIndex = (key: string): string => {
  return zIndexMap[key];
};

export { getZIndex };
