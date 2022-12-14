import React, { useState, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { swap, delay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

type TString = {
  letter: string;
  state?: ElementStates;
};

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [valueString, setValueString] = useState<Array<TString>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [valueArray, setValueArray] = useState<Array<TString>>([]);

  const createArr = (str: string): TString[] => {
    setValueArray([]);

    const arr: TString[] = []

    for (let i = 0; i < str.length; i++) {
      arr.push({ letter: str[i], state: ElementStates.Default })
    }

    setValueArray([...arr]);

    return arr;
  }

  useEffect(() => {
    if (valueArray) {
      setValueString([...valueArray]);
    }
  }, [valueArray])

  const reverse = async (arr: Array<TString>) => {
    let head = 0;
    let tail = arr.length - 1;

    if (arr.length === 1) {
      changeColor(arr[head], arr[tail], ElementStates.Modified)
      setValueArray([...arr])

      return;
    }

    if (arr.length <= 2) {
      changeColor(arr[head], arr[tail], ElementStates.Changing)

      await delay(DELAY_IN_MS)
      swap(arr, head, tail);
      changeColor(arr[head], arr[tail], ElementStates.Modified)

      setValueArray([...arr])

      return;
    }

    while (head <= tail) {
      if (head === tail) {
        changeColor(arr[head], arr[tail], ElementStates.Modified)
      }

      changeColor(arr[head], arr[tail], ElementStates.Changing)
      setValueArray([...arr])

      await delay(DELAY_IN_MS)

      swap(arr, head, tail);
      changeColor(arr[head], arr[tail], ElementStates.Modified)

      head++;
      tail--;

      setValueArray([...arr])
    }
  }

  const changeColor = (head: TString, tail: TString, state: ElementStates) => {
    head.state = state;
    tail.state = state;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const target = e.target as HTMLInputElement;
    setInput(target.value);
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    setIsLoading(true)

    await reverse(createArr(input))

    setIsLoading(false)
  }

  return (
    <SolutionLayout title="????????????">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <Input
            maxLength={11}
            isLimitText={true}
            onChange={onChange}
            value={input}
            disabled={isLoading}
            extraClass={'mb-40 mr-8'} />
          <Button
            text={"????????????????????"}
            type={"submit"}
            isLoader={isLoading}
            disabled={!input}
          />
        </div>
        <ul className={styles.ul}>
          {valueString?.map((item, index) => (
            <li key={index}>
              <Circle
                state={item.state}
                letter={item.letter}
                extraClass={'ml-8'}
              />
            </li>
          ))
          }
        </ul>
      </form>
    </SolutionLayout>
  );
};
