const zIndexMap: { [k: string]: string } = {
  fixedBottom: "10000000",
};

const getZIndex = (key: string): string => {
  return zIndexMap[key];
};

export { getZIndex };
