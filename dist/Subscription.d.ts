import { Observer, Subscriber, Cleanup } from './Observer';
export declare class Subscription<T> {
    private subscriber;
    isUnsubscribed: boolean;
    isStopped: boolean;
    cleanup: Cleanup;
    constructor(subscriber: Subscriber<T>, destination: Observer<T>);
    unsubscribe(): void;
}
