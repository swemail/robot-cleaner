export const range = (from: number, size: number) =>
  [...Array(size).keys()].map((k) => k + from);
