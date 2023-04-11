export const isAscendingArr = (arr: number[]) => {
  const temp = arr.slice(1);
  return temp.every((a, i) => arr[i] <= a);
};
