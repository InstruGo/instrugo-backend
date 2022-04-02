export const addToAverage = (
  currentAverage: number,
  valueToAdd: number,
  oldCount: number
) => {
  return (oldCount * currentAverage + valueToAdd) / (oldCount + 1);
};

export const updateAverage = (
  currentAverage: number,
  oldValue: number,
  newValue: number,
  oldCount: number
) => {
  return (oldCount * currentAverage - oldValue + newValue) / oldCount;
};

export const removeFromAverage = (
  currentAverage: number,
  valueToRemove: number,
  oldCount: number
) => {
  if (oldCount === 1) return 0;

  return (oldCount * currentAverage - valueToRemove) / (oldCount - 1);
};
