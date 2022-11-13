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
import { max, maxLen, min, minLen } from "../../constants/sotring";

type TSort = {
  element: number;
  state?: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [valueSort, setValueSort] = useState<Array<TSort>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [valueArray, setValueArray] = useState<Array<TSort>>([]);
  const [isChecked, setIsChecked] = useState<string>('Выбор' || 'Пузырёк');

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
      let minIndex = i;
      for (let j = i + 1; j < length; j++) {
        if (arr[j].element < arr[minIndex].element) {
          minIndex = j;
        }
      }

      changeColor(arr[i], arr[minIndex], 'chanding')
      setValueArray([...arr])

      await delay(DELAY_IN_MS)

      swap(arr, i, minIndex)
      changeColor(arr[i], arr[minIndex], 'modified')
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
      let minIndex = i;
      for (let j = i + 1; j < length; j++) {
        if (arr[j].element > arr[minIndex].element) {
          minIndex = j;
        }
      }

      changeColor(arr[i], arr[minIndex], 'chanding')
      setValueArray([...arr])

      await delay(DELAY_IN_MS)

      swap(arr, i, minIndex)
      changeColor(arr[i], arr[minIndex], 'modified')
      setValueArray([...arr])
    }
    setValueArray([...arr])

    return arr;
  };


  const bubbleSortAscending = async (arr: TSort[]) => {
    arr.forEach(item => {
      item.state = ElementStates.Default;
    });

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].element > arr[j].element) {
          changeColor(arr[i], arr[j], 'chanding')
          setValueArray([...arr])

          await delay(DELAY_IN_MS)
          swap(arr, i, j);

          changeColor(arr[i], arr[j], 'modified')
          setValueArray([...arr])
        }
      }
    }

    setValueArray([...arr])
    return arr;
  }

  const bubbleSortDescending = async (arr: TSort[]) => {
    arr.forEach(item => {
      item.state = ElementStates.Default;
    });

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].element < arr[j].element) {
          changeColor(arr[i], arr[j], 'chanding')
          setValueArray([...arr])

          await delay(DELAY_IN_MS)
          swap(arr, i, j);

          changeColor(arr[i], arr[j], 'modified')
          setValueArray([...arr])
        }
      }
    }

    setValueArray([...arr])
    return arr;
  }

  const changeColor = (head: TSort, tail: TSort, state: string) => {
    if (state === 'default') {
      head.state = ElementStates.Default;
      tail.state = ElementStates.Default;
    }

    if (state === 'chanding') {
      head.state = ElementStates.Changing;
      tail.state = ElementStates.Changing;
    }

    if (state === 'modified') {
      head.state = ElementStates.Modified;
      tail.state = ElementStates.Modified;
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
    let target = e.target as HTMLInputElement;

    setIsChecked(target.value)
  }

  const handleCreate = () => {
    setValueArray([])
    setValueSort(createArr(randomArr(minLen, maxLen, min, max)))
  }

  const handleAscending = async () => {
    setIsLoading(true)

    if (isChecked === 'Выбор') {
      await selectionSortAscending(valueArray);
    }

    if (isChecked === 'Пузырёк') {
      await bubbleSortAscending(valueArray);
    }

    setIsLoading(false)
  }

  const handleDescending = async () => {

    setIsLoading(true)

    if (isChecked === 'Выбор') {
      await selectionSortDescending(valueArray);
    }

    if (isChecked === 'Пузырёк') {
      await bubbleSortDescending(valueArray);
    }

    setIsLoading(false)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <div className={styles.itemContainer}>
            <RadioInput
              label="Выбор"
              name="array"
              value="Выбор"
              onClick={onChecked}
              extraClass={'mr-12'} />
            <RadioInput
              label="Пузырёк"
              name="array"
              value="Пузырёк"
              onClick={onChecked} />
          </div>
          <div className={styles.itemContainer}>
            <Button
              text={"По возврастанию"}
              type={"button"}
              isLoader={isLoading}
              sorting={Direction.Ascending}
              onClick={handleAscending}
              extraClass={'mr-12'}
            />
            <Button
              text={"По убыванию"}
              type={"button"}
              isLoader={isLoading}
              sorting={Direction.Descending}
              onClick={handleDescending}
            />
          </div>
          <Button
            text={"Новый Массив"}
            type={"button"}
            isLoader={isLoading}
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
      </form>
    </SolutionLayout>
  );
};
