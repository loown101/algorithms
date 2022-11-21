import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import styles from "./queue-page.module.css";
import { Queue } from "./queue-class";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { maxSizeQueue } from "../../constants/sorting";

type TQueue = {
  letter: string;
  state: ElementStates;
  head?: string;
  tail?: string;
};

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState<string>();
  const [value, setValue] = useState<Array<TQueue>>([]);
  const [valueArray, setValueArray] = useState<Array<TQueue | null>>(Array(maxSizeQueue));
  const [queue, setQueue] = useState<Queue<TQueue>>(new Queue<TQueue>(maxSizeQueue));

  useEffect(() => {
    const arr: TQueue[] = []

    const tail = queue.getTail();
    const head = queue.getHead();

    for (const elem of valueArray) {
      if (elem) {
        arr.push({ ...elem, head: '', tail: '' })
      } else {
        arr.push({ letter: '', state: ElementStates.Default, head: '', tail: '' })
      }
    }

    if (!queue.isEmpty()) {
      arr[head].head = 'head';
      arr[tail].tail = 'tail';
    }

    setValue([...arr])
  }, [valueArray])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const target = e.target as HTMLInputElement;
    setInput(target.value);
  }

  const addQueue = async (str: string) => {
    queue.enqueue({ letter: str, state: ElementStates.Changing })
    setValueArray([...queue.getElement()]);

    await delay(SHORT_DELAY_IN_MS);

    queue.last()!.state = ElementStates.Default
    setValueArray([...queue.getElement()]);
  }

  const deleteQueue = async () => {
    queue.peak()!.state = ElementStates.Changing;
    setValueArray([...queue.getElement()]);

    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue()

    setValueArray([...queue.getElement()]);
  }

  const resetQueue = async () => {
    setValueArray(Array(maxSizeQueue));
    queue.reset()
  }

  const handleAdd = async () => {
    if (queue.isFull()) {
      return;
    }

    setInput('')

    if (input) {
      await addQueue(input)
    }
  }

  const handleDelete = async () => {
    await deleteQueue()
  }

  const handleReset = async () => {
    setInput('')

    await resetQueue()
  }

  return (
    <SolutionLayout title="Очередь">
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
            disabled={!input?.length}
            onClick={handleAdd}
            extraClass={'mr-6'}
          />
          <Button
            text={"Удалить"}
            type={"button"}
            disabled={queue.isEmpty()}
            onClick={handleDelete}
            extraClass={'mr-40'}
          />
          <Button
            text={"Очистить"}
            type={"reset"}
            disabled={queue.getTail() < 0}
            onClick={handleReset}
          />
        </div>
        <ul className={styles.ul}>
          {value?.map((item, index) => (
            <li key={index}>
              <Circle
                state={item.state}
                letter={item.letter}
                extraClass={'ml-8'}
                index={index}
                head={item.head}
                tail={item.tail}
              />
            </li>
          ))
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
