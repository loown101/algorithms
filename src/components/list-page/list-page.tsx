import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./list-class";
import styles from "./list-page.module.css";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ArrowIcon } from "../ui/icons/arrow-icon";

type TList = {
  letter: string;
  state: ElementStates;
  head?: string;
  tail?: string;
};


export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>();
  const [inputIndex, setInputIndex] = useState<number | null>();
  const [valueArray, setValueArray] = useState<Array<TList>>([])
  const [upArray, setUpArray] = useState<Array<TList>>([])
  const [downArray, setDownArray] = useState<Array<TList>>([])
  const [list, setList] = useState<LinkedList<TList>>(new LinkedList<TList>());
  const [value, setValue] = useState<Array<TList>>([])
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLoadingAddHead, setIsLoadingAddHead] = useState<boolean>(false);
  const [isLoadingAddTail, setIsLoadingAddTail] = useState<boolean>(false);
  const [isLoadingAddIndex, setIsLoadingAddIndex] = useState<boolean>(false);
  const [isLoadingDeleteHead, setIsLoadingDeleteHead] = useState<boolean>(false);
  const [isLoadingDeleteTail, setIsLoadingDeleteTail] = useState<boolean>(false);
  const [isLoadingDeleteIndex, setIsLoadingDeleteIndex] = useState<boolean>(false);

  useEffect(() => {
    list.append({ letter: '0', state: ElementStates.Default })
    list.append({ letter: '34', state: ElementStates.Default })
    list.append({ letter: '8', state: ElementStates.Default })
    list.append({ letter: '1', state: ElementStates.Default })

    setValueArray([...list.toArray()])
    setUpArray([...Array(list.getSize())])
    setDownArray([...Array(list.getSize())])
  }, [])

  useEffect(() => {
    const arr: TList[] = []

    for (const elem of valueArray) {
      arr.push({ ...elem, head: '', tail: '' })
    }

    if (arr.length > 0) {
      arr[0].head = (upArray[0] ? ' ' : 'head');
      arr[arr.length - 1].tail = (downArray[arr.length - 1] ? ' ' : 'tail');
    }

    setValue([...arr])
  }, [valueArray, upArray, downArray])

  const onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    let target = e.target as HTMLInputElement;

    if (target.value.length <= 4) {
      setInputValue(target.value);
    }
  }

  const onChangeIndex = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    let target = e.target as HTMLInputElement;

    setInputIndex(+target.value);

  }

  const addHead = async (str: string) => {
    const upArr = Array(list.getSize());

    upArr[0] = { letter: str, state: ElementStates.Changing }
    setUpArray([...upArr])

    await delay(SHORT_DELAY_IN_MS)

    list.prepend({ letter: str, state: ElementStates.Modified })

    const resultArr = list.toArray();
    setValueArray([...resultArr])

    upArr[0] = null;
    setUpArray([...upArr])

    await delay(SHORT_DELAY_IN_MS)

    resultArr[0].state = ElementStates.Default
    setValueArray([...resultArr])
  }

  const deleteHead = async () => {
    const resultArr = list.toArray();
    const downArr = Array(list.getSize());

    downArr[0] = { letter: resultArr[0].letter, state: ElementStates.Changing }
    resultArr[0].letter = '';

    setDownArray([...downArr]);
    setValueArray([...resultArr]);

    await delay(SHORT_DELAY_IN_MS)

    list.deleteHead()

    downArr[0] = null;
    setDownArray([...downArr]);
    setValueArray([...list.toArray()])
  }

  const addTail = async (str: string) => {
    const upArr = Array(list.getSize());

    upArr[upArr.length - 1] = { letter: str, state: ElementStates.Changing }
    setUpArray([...upArr])

    await delay(SHORT_DELAY_IN_MS)

    list.append({ letter: str, state: ElementStates.Modified })

    const resultArr = list.toArray();
    setValueArray([...resultArr])

    upArr[upArr.length - 1] = null;
    setUpArray([...upArr])

    await delay(SHORT_DELAY_IN_MS)

    resultArr[resultArr.length - 1].state = ElementStates.Default
    setValueArray([...resultArr])
  }

  const deleteTail = async () => {
    const resultArr = list.toArray();
    const downArr = Array(list.getSize());

    downArr[downArr.length - 1] = { letter: resultArr[resultArr.length - 1].letter, state: ElementStates.Changing }
    resultArr[resultArr.length - 1].letter = '';

    setDownArray([...downArr]);
    setValueArray([...resultArr]);

    await delay(SHORT_DELAY_IN_MS)

    list.deleteTail()

    downArr[downArr.length - 1] = null;
    setDownArray([...downArr]);
    setValueArray([...list.toArray()])

  }

  const addIndex = async (str: string, index: number) => {
    let resultArr = list.toArray();

    for (let i = 0; i <= index; i++) {
      const upArr = Array(list.getSize());

      upArr[i] = { letter: str, state: ElementStates.Changing }
      setUpArray([...upArr])

      if (i > 0) {
        resultArr[i - 1].state = ElementStates.Changing;
        setValueArray([...resultArr]);
      }

      await delay(SHORT_DELAY_IN_MS)
    }

    list.addByIndex({ letter: str, state: ElementStates.Modified }, index)

    resultArr = list.toArray();

    for (let i = 0; i < index; i++) {
      resultArr[i].state = ElementStates.Default;
    }

    setValueArray([...resultArr])

    setUpArray([...Array(list.getSize())])

    await delay(SHORT_DELAY_IN_MS)

    resultArr[index].state = ElementStates.Default;
    setValueArray([...resultArr])
  }

  const deleteIndex = async (index: number) => {
    let resultArr = list.toArray();

    for (let i = 0; i <= index; i++) {
      resultArr[i].state = ElementStates.Changing;
      setValueArray([...resultArr]);

      await delay(SHORT_DELAY_IN_MS)
    }

    const downArr = Array(list.getSize())

    downArr[index] = { letter: resultArr[index].letter, state: ElementStates.Modified }
    setDownArray([...downArr])

    resultArr[index].letter = '';
    setValueArray([...resultArr])

    await delay(SHORT_DELAY_IN_MS)

    list.deleteByIndex(index)

    resultArr = list.toArray();

    for (let i = 0; i < index; i++) {
      resultArr[i].state = ElementStates.Default;
    }

    setValueArray([...resultArr])
    setDownArray([])
  }

  const handleAddHead = async () => {
    setIsDisabled(true)
    setIsLoadingAddHead(true)

    setInputValue('');

    if (inputValue) {
      await addHead(inputValue)
    }

    setIsDisabled(false)
    setIsLoadingAddHead(false)
  }

  const handleDeleteHead = async () => {
    setIsDisabled(true)
    setIsLoadingDeleteHead(true)

    await deleteHead()

    setIsDisabled(false)
    setIsLoadingDeleteHead(false)
  }

  const handleAddTail = async () => {
    setIsDisabled(true)
    setIsLoadingAddTail(true)

    setInputValue('');

    if (inputValue) {
      await addTail(inputValue)
    }

    setIsDisabled(false)
    setIsLoadingAddTail(false)
  }

  const handleDeleteTail = async () => {
    setIsDisabled(true)
    setIsLoadingDeleteTail(true)

    await deleteTail()

    setIsDisabled(false)
    setIsLoadingDeleteTail(false)
  }

  const handleAddIndex = async () => {
    if (!inputIndex || !inputValue || inputIndex < 0 || inputIndex > list.getSize()) {
      return;
    }

    setIsDisabled(true)
    setIsLoadingAddIndex(true)

    setInputValue('');
    setInputIndex(null);

    await addIndex(inputValue, inputIndex)

    setIsDisabled(false)
    setIsLoadingAddIndex(false)
  }

  const handleDeleteIndex = async () => {
    if (!inputIndex || inputIndex < 0 || inputIndex > list.getSize()) {
      return;
    }

    setIsDisabled(true)
    setIsLoadingDeleteIndex(true)

    await deleteIndex(inputIndex)

    setIsDisabled(false)
    setIsLoadingDeleteIndex(false)
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <Input
              maxLength={4}
              isLimitText={true}
              onChange={(e) => (onChangeValue(e))}
              value={inputValue}
              disabled={isDisabled}
            />
          </div>
          <Button
            text={"Добавить в head"}
            type={"button"}
            isLoader={isLoadingAddHead}
            disabled={isDisabled}
            onClick={handleAddHead}
            linkedList={'small'}
            extraClass={'mr-6 ml-6'}
          />
          <Button
            text={"Добавить в tail"}
            type={"button"}
            isLoader={isLoadingAddTail}
            disabled={isDisabled}
            onClick={handleAddTail}
            linkedList={'small'}
            extraClass={'mr-8'}
          />
          <Button
            text={"Удалить из head"}
            type={"button"}
            isLoader={isLoadingDeleteHead}
            disabled={isDisabled || (list.getSize() === 0)}
            onClick={handleDeleteHead}
            linkedList={'small'}
            extraClass={'mr-6'}
          />
          <Button
            text={"Удалить из tail"}
            type={"button"}
            isLoader={isLoadingDeleteTail}
            disabled={isDisabled || (list.getSize() === 0)}
            onClick={handleDeleteTail}
            linkedList={'small'}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <Input
              type="number"
              min={0}
              max={(valueArray.length === 0) ? 0 : valueArray.length - 1}
              isLimitText={true}
              onChange={(e) => (onChangeIndex(e))}
              value={inputIndex || ''}
              disabled={isDisabled}
            />
          </div>
          <Button
            text={"Добавить по индексу"}
            type={"button"}
            isLoader={isLoadingAddIndex}
            disabled={isDisabled
              || (!inputValue || !inputIndex)
              || (inputIndex < 0 || inputIndex >= list.getSize())}
            onClick={handleAddIndex}
            extraClass={'mr-8 ml-6'}
            linkedList={'big'}
          />
          <Button
            text={"Удалить по индексу"}
            type={"button"}
            isLoader={isLoadingDeleteIndex}
            disabled={isDisabled
              || (!inputValue || !inputIndex)
              || (list.getSize() === 0)
              || (inputIndex < 0 || inputIndex >= list.getSize())}
            onClick={handleDeleteIndex}
            linkedList={'big'}
          />
        </div>

        <ul className={styles.ul}>
          {upArray?.map((item, index) => (
            <li key={index} className={`${(item) ? styles.visible : styles.hidden} ${styles.liSmall}`}>
              <Circle
                state={item?.state}
                letter={item?.letter}
                extraClass={'mb-12 ml-6'}
                isSmall={true}
              />
            </li>
          ))
          }
        </ul>

        <ul className={styles.ul}>
          {value?.map((item, index) => (
            <li key={index} className={styles.li}>
              <Circle
                state={item.state}
                letter={item.letter}
                head={item.head}
                tail={item.tail}
                index={index}
                extraClass={'ml-20 ml-6'}
              />
              <div className={styles.icon}>
                <ArrowIcon fill={'#0032FF'} />
              </div>
            </li>
          ))
          }
        </ul>

        <ul className={styles.ul}>
          {downArray?.map((item, index) => (
            <li key={index} className={`${(item) ? styles.visible : styles.hidden} ${styles.liSmall}`}>
              <Circle
                state={item?.state}
                letter={item?.letter}
                extraClass={'ml-6 mt-20'}
                isSmall={true}
              />
            </li>
          ))
          }
        </ul>

      </form>
    </SolutionLayout>
  );
};
