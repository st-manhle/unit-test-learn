export const isAscendingArr = (arr) => {
  if (!(Array.isArray(arr) && arr.length >= 2)) {
    return false;
  }
  if (!arr.every(item => typeof item === 'number' && !Number.isNaN(item))) {
    return false;
  }
  const a = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] <= arr[i + 1]) {
      a.push(true);
    }
  }

  return !a.includes(false);
};

export const handleRemoveItems = (arr: unknown[], ids: unknown[]) => {
  return arr.filter((_item: {id: unknown}) => !ids.includes(_item.id));
};
