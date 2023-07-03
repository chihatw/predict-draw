export const toggleElement = (arr: string[], val: string) =>
  arr.includes(val) ? arr.filter((el) => el !== val) : [...arr, val];
