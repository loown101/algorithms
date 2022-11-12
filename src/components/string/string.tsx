import React, { useState, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { swap, delay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export type TString = {
  letter: string;
  state?: ElementStates;
};

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [valueString, setValueString] = useState<Array<TString>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createArr = (str: string) => {
    setValueString([]);

    for (let i = 0; i < str.length; i++) {
      let item: TString = { letter: str[i], state: ElementStates.Default }

      setValueString(valueString => [...valueString, item]);
    }
  }

  useEffect(() => {
    createArr(input);
  }, [input])

  const reverse = async (arr: Array<TString>) => {
    let head: number = 0;
    let tail: number = arr.length - 1;

    if (arr.length === 1) {
      changeColor(arr[head], arr[tail], 'modified')
      setValueString([...arr])

      return;
    }

    if (arr.length <= 2) {
      swap(arr, head, tail);
      changeColor(arr[head], arr[tail], 'modified')
      setValueString([...arr])

      return;
    }

    while (head <= tail) {
      if (head === tail) {
        changeColor(arr[head], arr[tail], 'modified')
      }

      changeColor(arr[head], arr[tail], 'chanding')
      setValueString([...arr])

      await delay(DELAY_IN_MS)

      swap(arr, head, tail);
      changeColor(arr[head], arr[tail], 'modified')

      head++;
      tail--;

      setValueString([...arr])
    }
  }

  const changeColor = (head: TString, tail: TString, state: string) => {
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

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    let target = e.target as HTMLInputElement;
    setInput(target.value);
  }


  const hangleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    setIsLoading(true)

    await reverse(valueString);

    setIsLoading(false)
  }

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={hangleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <Input
            maxLength={11}
            isLimitText={true}
            onChange={(e) => (onChange(e))}
            value={input}
            disabled={isLoading}
            extraClass={'mb-40 mr-8'} />
          <Button
            text={"Развернуть"}
            type={"submit"}
            isLoader={isLoading}
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
