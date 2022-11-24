export const swap = <T>(arr: number[] | string[] | Array<T>, firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

