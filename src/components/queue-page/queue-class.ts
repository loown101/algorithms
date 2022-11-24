interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = -1;
  private tail = -1;
  private readonly size: number = 0;
  private length = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.tail >= this.size - 1) {
      throw new Error("Maximum length exceeded");
    }

    if (this.tail < 0) {
      this.head = 0;
    }

    this.container[(this.tail + 1) % this.size] = item;

    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head % this.size] = null;

    this.head++;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  last = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    return this.container[this.tail % this.size];
  }

  reset = () => {
    this.head = -1;
    this.tail = -1;
    this.length = 0;

    this.container = Array(this.size);
  }

  getHead = () => {
    return this.head;
  }

  getTail = () => {
    return this.tail;
  }

  getElement = () => {
    return this.container;
  }

  isEmpty = () => this.length === 0;

  isFull = () => this.tail === this.size - 1;
}