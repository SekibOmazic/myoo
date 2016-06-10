export interface Observer<T> {
  next(value: T): void;
  error?(err: any): void;
  complete?(): void;
}

export type Cleanup = () => any | void;
export type Subscriber<T> = (observer: Observer<T>) => Cleanup;