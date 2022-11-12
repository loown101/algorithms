import { TString } from '../components/string/string'

export const swap = (arr: number[] | string[] | TString[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

