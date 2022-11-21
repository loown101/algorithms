export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getSize: () => number;
  toArray: () => Array<T>;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index >= this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);
      let curr = this.head;
      let prev = curr;
      let currIndex = 0;

      if (index === 0) {
        node.next = curr;
        this.head = node;
      } else {

        while (currIndex < index && curr !== null) {
          currIndex++;
          prev = curr;
          curr = curr.next;
        }
        if (prev) {
          node.next = curr;
          prev.next = node;
        }
      }
      this.size++;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else if (this.head) {
      if (index === 0) {
        this.deleteHead()
      } else if (index === this.size - 1) {
        this.deleteTail()
      } else {
        let curr = this.head;
        let prev = curr;
        let currIndex = 0;

        while (curr.next) {
          if (currIndex === index) {
            prev.next = curr.next;
            this.size--;

            break;
          }

          prev = curr;
          curr = curr.next;
          currIndex++;
        }
      }
    }
  }

  deleteHead() {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  }

  deleteTail() {
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }

    if (this.head) {
      let curr = this.head;
      let prev = this.head;

      while (curr.next) {
        prev = curr;
        curr = curr.next;
      }

      prev.next = null;
      this.tail = prev;

      this.size--;
    }
  }

  append(element: T) {
    const node = new Node(element);
    if (this.tail) this.tail.next = node;
    this.tail = node;
    if (!this.head) this.head = node;

    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element, this.head);
    this.head = node;

    if (!this.tail) this.tail = node;

    this.size++;
  }

  getSize() {
    return this.size;
  }

  toArray() {
    const arr: Array<T> = [];
    let curr = this.head;

    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }

    return arr;
  }
}