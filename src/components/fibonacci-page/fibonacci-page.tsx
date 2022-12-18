import React, { useState, useEffect } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css";

type TFibonacci = {
  index?: number;
  result?: number;
};

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState<null | number>(null);
  const [valueNumber, setValueNumber] = useState<Array<TFibonacci>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [valueArray, setValueArray] = useState<Array<TFibonacci>>([]);

  useEffect(() => {
    if (valueArray) {
      setValueNumber([...valueArray]);
    }
  }, [valueArray])

  const fibonacci = async (n: number) => {
    const arr: TFibonacci[] = [];

    let a = 1;
    let b = 1;

    for (let i = 0; i <= n; i++) {
      if (i < 2) {
        arr.push({ index: i, result: b });

        await delay(DELAY_IN_MS)
        setValueArray([...arr])
      }

      if (i >= 2) {
        const c = a + b;
        a = b;
        b = c;

        arr.push({ index: i, result: b })

        await delay(DELAY_IN_MS)
        setValueArray([...arr])
      }
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const target = e.target as HTMLInputElement;

    if (target.value.length <= 2) {
      setInput(+target.value);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    if (input) {
      setValueArray([])
      await fibonacci(input);
    }

    setIsLoading(false)
  }
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <Input
            type="number"
            min={1}
            max={19}
            isLimitText={true}
            onChange={onChange}
            disabled={isLoading}
            extraClass={'mb-40 mr-8'}
          />
          <Button
            text={"Рассчитать"}
            type={"submit"}
            isLoader={isLoading}
            disabled={!input}
          />
        </div>
        <ul className={styles.ul}>
          {valueNumber?.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.result + ''}
                index={item.index}
                extraClass={'ml-8 mb-20'}
              />
            </li>
          ))
          }
        </ul>
      </form>
    </SolutionLayout>
  );
};
