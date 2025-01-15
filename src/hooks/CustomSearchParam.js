const useCustomSearchParam = () => {
  const getNum = (param, defaultValue) => {
    if (!param) {
      return defaultValue;
    }
    return parseInt(param);
  };
  const getStr = (param, defaultvalue) => {
    if (!param) {
      return defaultvalue;
    }
    return param;
  };
  return { getNum, getStr };
};
export default useCustomSearchParam;
