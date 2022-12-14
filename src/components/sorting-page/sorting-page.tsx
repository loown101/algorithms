import React, { useState, useEffect } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay, swap } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { max, maxLen, min, minLen } from "../../constants/sorting";

type TSort = {
  element: number;
  state?: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [valueSort, setValueSort] = useState<Array<TSort>>([]);
  const [valueArray, setValueArray] = useState<Array<TSort>>([]);
  const [isChecked, setIsChecked] = useState<string>('Выбор' || 'Пузырёк');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLoadingAsc, setIsLoadingAsc] = useState<boolean>(false);
  const [isLoadingDes, setIsLoadingDes] = useState<boolean>(false);

  useEffect(() => {
    setValueSort(createArr(randomArr(minLen, maxLen, min, max)))
  }, [])


  useEffect(() => {
    if (valueArray) {
      setValueSort([...valueArray]);
    }
  }, [valueArray])

  const getRandomIntInclusive = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const randomArr = (minLen: number, maxLen: number, min: number, max: number): number[] => {
    const arr: number[] = [];

    arr.length = getRandomIntInclusive(minLen, maxLen)


    for (let i = 0; i < arr.length; i++) {
      arr[i] = getRandomIntInclusive(min, max)
    }

    return arr;
  }

  const selectionSortAscending = async (arr: TSort[]) => {
    const { length } = arr;

    arr.forEach(item => {
      item.state = ElementStates.Default;
    });

    for (let i = 0; i < length; i++) {
      changeColor(arr[i], ElementStates.Changing)
      setValueArray([...arr])

      let minIndex = i;
      for (let j = i + 1; j < length; j++) {

        changeColor(arr[j], ElementStates.Changing)
        setValueArray([...arr])

        await delay(DELAY_IN_MS)

        if (arr[j].element < arr[minIndex].element) {
          minIndex = j;
        }

        changeColor(arr[j], ElementStates.Default)
        setValueArray([...arr])
      }

      swap(arr, i, minIndex)

      changeColor(arr[minIndex], ElementStates.Default)
      changeColor(arr[i], ElementStates.Modified)
      setValueArray([...arr])
    }
    setValueArray([...arr])

    return arr;
  };

  const selectionSortDescending = async (arr: TSort[]) => {
    const { length } = arr;

    arr.forEach(item => {
      item.state = ElementStates.Default;
    });

    for (let i = 0; i < length; i++) {
      changeColor(arr[i], ElementStates.Changing)
      setValueArray([...arr])

      let minIndex = i;
      for (let j = i + 1; j < length; j++) {

        changeColor(arr[j], ElementStates.Changing)
        setValueArray([...arr])

        await delay(DELAY_IN_MS)

        if (arr[j].element > arr[minIndex].element) {
          minIndex = j;
        }

        changeColor(arr[j], ElementStates.Default)
        setValueArray([...arr])
      }

      swap(arr, i, minIndex)

      changeColor(arr[minIndex], ElementStates.Default)
      changeColor(arr[i], ElementStates.Modified)
      setValueArray([...arr])
    }
    setValueArray([...arr])

    return arr;
  };


  const bubbleSortAscending = async (arr: TSort[]) => {
    arr.forEach(item => {
      item.state = ElementStates.Default;
    });

    for (let i = 0; i < (arr.length - 1); i++) {
      for (let j = 0; j < (arr.length - i - 1); j++) {
        changeColor(arr[j], ElementStates.Changing)
        changeColor(arr[j + 1], ElementStates.Changing)
        setValueArray([...arr])

        await delay(DELAY_IN_MS)

        if (arr[j].element > arr[j + 1].element) {


          swap(arr, j, j + 1);

          setValueArray([...arr])
        }

        changeColor(arr[j], ElementStates.Default)
        changeColor(arr[j + 1], ElementStates.Default)
        setValueArray([...arr])

      }

      changeColor(arr[arr.length - i - 1], ElementStates.Modified)
      setValueArray([...arr])
    }

    changeColor(arr[0], ElementStates.Modified)

    setValueArray([...arr])
    return arr;
  }

  const bubbleSortDescending = async (arr: TSort[]) => {
    arr.forEach(item => {
      item.state = ElementStates.Default;
    });

    for (let i = 0; i < (arr.length - 1); i++) {
      for (let j = 0; j < (arr.length - i - 1); j++) {
        changeColor(arr[j], ElementStates.Changing)
        changeColor(arr[j + 1], ElementStates.Changing)
        setValueArray([...arr])

        await delay(DELAY_IN_MS)

        if (arr[j].element < arr[j + 1].element) {


          swap(arr, j, j + 1);

          setValueArray([...arr])
        }

        changeColor(arr[j], ElementStates.Default)
        changeColor(arr[j + 1], ElementStates.Default)
        setValueArray([...arr])

      }

      changeColor(arr[arr.length - i - 1], ElementStates.Modified)
      setValueArray([...arr])
    }

    changeColor(arr[0], ElementStates.Modified)

    setValueArray([...arr])
    return arr;

  }

  const changeColor = (head: TSort, state: ElementStates, tail?: TSort) => {

    head.state = state;

    if (tail) {
      tail.state = state;
    }
  }


  const createArr = (randomArr: number[]): TSort[] => {
    setValueArray([]);

    const arr: TSort[] = []

    for (let i = 0; i < randomArr.length; i++) {
      arr.push({ element: randomArr[i], state: ElementStates.Default })
    }

    setValueArray([...arr]);

    return arr;
  }

  const onChecked = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setIsChecked(target.value)
  }

  const handleCreate = () => {
    setValueArray([])
    setValueSort(createArr(randomArr(minLen, maxLen, min, max)))
  }

  const handleAscending = async () => {
    setIsDisabled(true)
    setIsLoadingAsc(true)

    if (isChecked === 'Выбор') {
      await selectionSortAscending(valueArray);
    }

    if (isChecked === 'Пузырёк') {
      await bubbleSortAscending(valueArray);
    }

    setIsDisabled(false)
    setIsLoadingAsc(false)
  }

  const handleDescending = async () => {
    setIsDisabled(true)
    setIsLoadingDes(true)

    if (isChecked === 'Выбор') {
      await selectionSortDescending(valueArray);
    }

    if (isChecked === 'Пузырёк') {
      await bubbleSortDescending(valueArray);
    }

    setIsDisabled(false)
    setIsLoadingDes(false)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.form}>
        <div className={styles.inputContainer}>
          <div className={styles.itemContainer}>
            <RadioInput
              label="Выбор"
              name="array"
              value="Выбор"
              onClick={onChecked}
              extraClass={'mr-12'}
              disabled={valueSort.length === 0}
            />
            <RadioInput
              label="Пузырёк"
              name="array"
              value="Пузырёк"
              onClick={onChecked}
              disabled={valueSort.length === 0}
            />
          </div>
          <div className={styles.itemContainer}>
            <Button
              text={"По возврастанию"}
              type={"button"}
              isLoader={isLoadingAsc}
              disabled={isDisabled || valueSort.length === 0}
              sorting={Direction.Ascending}
              onClick={handleAscending}
              extraClass={'mr-12'}
            />
            <Button
              text={"По убыванию"}
              type={"button"}
              isLoader={isLoadingDes}
              disabled={isDisabled || valueSort.length === 0}
              sorting={Direction.Descending}
              onClick={handleDescending}
            />
          </div>
          <Button
            text={"Новый Массив"}
            type={"button"}
            disabled={isDisabled}
            onClick={handleCreate}
          />
        </div>
        <ul className={styles.ul}>
          {valueSort?.map((item, index) => (
            <li key={index}>
              <Column
                index={item.element}
                state={item.state}
                extraClass={`${(340 * item.element) / 100}px mr-8`}

              />
            </li>
          ))
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
