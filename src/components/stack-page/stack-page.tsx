import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import styles from "./stack-page.module.css";
import { Stack } from "./stack-class";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TStack = {
  letter: string;
  state?: ElementStates;
  head?: string;
};

export const StackPage: React.FC = () => {
  const [input, setInput] = useState<string>();
  const [valueArray, setValueArray] = useState<Array<TStack>>([]);
  const [stack, setStack] = useState<Stack<TStack>>(new Stack<TStack>());
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isLoadingReset, setIsLoadingReset] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const target = e.target as HTMLInputElement;
    setInput(target.value);
  }


  const addStack = async (str: string) => {
    if (stack.getSize() > 0) {
      stack.peak()!.head = '';
    }

    stack.push({ letter: str, state: ElementStates.Changing, head: 'top' })
    setValueArray([...stack.getElement()]);

    await delay(SHORT_DELAY_IN_MS);

    stack.peak()!.state = ElementStates.Default;
    setValueArray([...stack.getElement()]);
  }

  const deleteStack = async () => {
    stack.peak()!.state = ElementStates.Changing;
    setValueArray([...stack.getElement()]);

    await delay(SHORT_DELAY_IN_MS)

    stack.pop()

    if (stack.getSize() > 0) {
      stack.peak()!.head = 'top';
    }

    setValueArray([...stack.getElement()]);
  }

  const resetStack = async () => {
    setValueArray([]);
    stack.reset()
  }

  const handleAdd = async () => {
    setIsLoadingAdd(true)
    setIsDisabled(true)

    setInput('')

    if (input) {
      await addStack(input)
    }

    setIsLoadingAdd(false)
    setIsDisabled(false)
  }

  const handleDelete = async () => {
    setIsLoadingDelete(true)
    setIsDisabled(true)

    if (stack.getSize() > 0) {
      await deleteStack()
    }

    setIsLoadingDelete(false)
    setIsDisabled(false)
  }

  const handleReset = async () => {
    setIsLoadingReset(true)
    setIsDisabled(true)

    setInput('')

    await resetStack()

    setIsLoadingReset(false)
    setIsDisabled(false)
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.form}>
        <div className={styles.inputContainer}>
          <Input
            maxLength={4}
            isLimitText={true}
            onChange={onChange}
            value={input || ''}
            extraClass={'mb-40 mr-8'} />
          <Button
            text={"Добавить"}
            type={"button"}
            disabled={!input?.length || isDisabled}
            isLoader={isLoadingAdd}
            onClick={handleAdd}
            extraClass={'mr-6'}
          />
          <Button
            text={"Удалить"}
            type={"button"}
            disabled={valueArray?.length === 0 || isDisabled}
            isLoader={isLoadingDelete}
            onClick={handleDelete}
            extraClass={'mr-40'}
          />
          <Button
            text={"Очистить"}
            type={"reset"}
            disabled={valueArray?.length === 0 || isDisabled}
            isLoader={isLoadingReset}
            onClick={handleReset}
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
      </div>
    </SolutionLayout>
  );
};
