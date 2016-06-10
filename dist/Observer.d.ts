export interface Observer<T> {
    next(value: T): void;
    error?(err: any): void;
    complete?(): void;
}
export declare type Cleanup = () => any | void;
export declare type Subscriber<T> = (observer: Observer<T>) => Cleanup;
