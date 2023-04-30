export const formatUserName = (str: string): string => {
  const firstChar = str.charAt(0);
  const maskedStr = firstChar + str.slice(0, -1).replace(/./g, "*");
  return maskedStr;
};
