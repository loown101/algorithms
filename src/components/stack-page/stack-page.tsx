import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import styles from "./stack-page.module.css";
import { Stack } from "./stack-class";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { couldStartTrivia } from "typescript";

type TStack = {
  letter: string;
  state?: ElementStates;
  head?: string;
};

export const StackPage: React.FC = () => {
  const [input, setInput] = useState<string>();
  const [valueStack, setValueStack] = useState<Array<TStack>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [valueArray, setValueArray] = useState<Array<TStack>>([]);
  const [stack, setStack] = useState<Stack<TStack>>(new Stack<TStack>());

  useEffect(() => {
    if (valueArray) {
      setValueStack([...valueArray]);
    }
  }, [])

  // useEffect(() => {
  //   if (valueArray) {
  //     setValueStack([...valueArray]);
  //   }
  // }, [valueArray])

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    let target = e.target as HTMLInputElement;
    setInput(target.value);
  }


  const addStack = async (str: string) => {
    stack.push({ letter: str, state: ElementStates.Changing, head: 'top' })
    setValueArray([...stack.getElement()]);

    const peak = stack.peak()

    await delay(SHORT_DELAY_IN_MS)
    if (peak) {
      console.log(peak)


      peak.state = ElementStates.Default;
      setValueArray([...stack.getElement()]);
    }
  }

  const deleteStack = async () => {
    stack.pop()
    setValueArray([...stack.getElement()]);
  }

  const resetStack = async () => {
    setValueArray([]);
    stack.reset()
  }

  const handleAdd = async () => {
    setIsLoading(true)

    setInput('')

    if (input) {
      await addStack(input)
    }

    setIsLoading(false)
  }

  const handleDelete = async () => {

    setIsLoading(true)

    await deleteStack()

    setIsLoading(false)
  }

  const handleReset = async () => {
    setIsLoading(true)

    setInput('')

    await resetStack()

    setIsLoading(false)
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <Input
            maxLength={4}
            isLimitText={true}
            onChange={(e) => (onChange(e))}
            value={input}
            disabled={isLoading}
            extraClass={'mb-40 mr-8'} />
          <Button
            text={"Добавить"}
            type={"button"}
            isLoader={isLoading}
            onClick={handleAdd}
            extraClass={'mr-12'}
          />
          <Button
            text={"Удалить"}
            type={"button"}
            isLoader={isLoading}
            onClick={handleDelete}
            extraClass={'mr-12'}
          />
          <Button
            text={"Очистить"}
            type={"reset"}
            isLoader={isLoading}
            onClick={handleReset}
            extraClass={'mr-12'}
          />
        </div>
        <ul className={styles.ul}>
          {valueArray?.map((item, index) => (
            <li key={index}>
              <Circle
                state={item.state}
                letter={item.letter}
                extraClass={'ml-8'}
                index={index}
                head={item.head}
              />
            </li>
          ))
          }
        </ul>
      </form>
    </SolutionLayout>
  );
};
