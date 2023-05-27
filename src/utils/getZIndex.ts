const zIndexMap: { [k: string]: string } = {
  fixedBottom: "10000000",
  fullScreen: "10000000",
  lottie: "10000001",
  settingButton: "200",
  popup: "10",
};

const getZIndex = (key: string): string => {
  return zIndexMap[key];
};

export { getZIndex };
