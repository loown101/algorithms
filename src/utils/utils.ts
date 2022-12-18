export const swap = <T>(arr: number[] | string[] | Array<T>, firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const reverse = (str: string) => {
  const arr = str.split('');

  let head = 0;
  let tail = arr.length - 1;

  if (arr.length === 1) {
    return arr.join('');
  }

  if (arr.length <= 2) {
    swap(arr, head, tail);
    return arr.join('');
  }

  while (head <= tail) {
    swap(arr, head, tail);

    head++;
    tail--;
  }

  return arr.join('');
}

export const selectionSortAscending = (arr: number[]) => {
  const { length } = arr;

  for (let i = 0; i < length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < length; j++) {

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    swap(arr, i, minIndex)

  }

  return arr;
};

export const selectionSortDescending = (arr: number[]) => {
  const { length } = arr;

  for (let i = 0; i < length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < length; j++) {

      if (arr[j] > arr[minIndex]) {
        minIndex = j;
      }
    }

    swap(arr, i, minIndex)

  }

  return arr;
};

export const bubbleSortAscending = (arr: number[]) => {
  for (let i = 0; i < (arr.length - 1); i++) {
    for (let j = 0; j < (arr.length - i - 1); j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }

  return arr;
}

export const bubbleSortDescending = (arr: number[]) => {
  for (let i = 0; i < (arr.length - 1); i++) {
    for (let j = 0; j < (arr.length - i - 1); j++) {
      if (arr[j] < arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }

  return arr;
}