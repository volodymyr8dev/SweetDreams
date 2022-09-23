
export const splitToChunks = (array: any, parts) => {
  let result = [];
  for (let i = parts; i > 0; i--) {
    result.push(array?.splice(0, Math.ceil(array.length / i)));
  }
  return result;
};

export const calcTemp = (temp) => temp*9.5+32