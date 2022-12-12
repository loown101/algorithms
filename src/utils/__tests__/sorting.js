import { selectionSortAscending, selectionSortDescending, bubbleSortAscending, bubbleSortDescending } from '../utils';

describe('test sorting array algorithms', () => {
  it('selectionSortAscending array empty', () => {
    const arr = [];

    const result = selectionSortAscending(arr);

    expect(result).toEqual([])
  })

  it('selectionSortAscending array with one element', () => {
    const arr = [1];

    const result = selectionSortAscending(arr);

    expect(result).toEqual([1])
  })

  it('selectionSortAscending array with some elements', () => {
    const arr = [1, 7, 9, 2, 5];

    const result = selectionSortAscending(arr);

    expect(result).toEqual([1, 2, 5, 7, 9])
  })

  it('selectionSortDescending array empty', () => {
    const arr = [];

    const result = selectionSortDescending(arr);

    expect(result).toEqual([])
  })

  it('selectionSortDescending array with one element', () => {
    const arr = [1];

    const result = selectionSortDescending(arr);

    expect(result).toEqual([1])
  })

  it('selectionSortDescending array with some elements', () => {
    const arr = [1, 7, 9, 2, 5];

    const result = selectionSortDescending(arr);

    expect(result).toEqual([9, 7, 5, 2, 1])
  })

  it('bubbleSortAscending array empty', () => {
    const arr = [];

    const result = bubbleSortAscending(arr);

    expect(result).toEqual([])
  })

  it('bubbleSortAscending array with one element', () => {
    const arr = [1];

    const result = bubbleSortAscending(arr);

    expect(result).toEqual([1])
  })

  it('bubbleSortAscending array with some elements', () => {
    const arr = [1, 7, 9, 2, 5];

    const result = bubbleSortAscending(arr);

    expect(result).toEqual([1, 2, 5, 7, 9])
  })

  it('bubbleSortDescending array empty', () => {
    const arr = [];

    const result = bubbleSortDescending(arr);

    expect(result).toEqual([])
  })

  it('bubbleSortDescending array with one element', () => {
    const arr = [1];

    const result = bubbleSortDescending(arr);

    expect(result).toEqual([1])
  })

  it('bubbleSortDescending array with some elements', () => {
    const arr = [1, 7, 9, 2, 5];

    const result = bubbleSortDescending(arr);

    expect(result).toEqual([9, 7, 5, 2, 1])
  })
})

