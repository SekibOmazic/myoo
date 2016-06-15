import {Observable} from '../../Observable';
import {partition} from '../../operator/partition';

Observable.prototype.partition = partition;

export interface PartitionSignature<T> {
  (predicate: (val: T) => boolean): [Observable<T>, Observable<T>];
}

declare module '../../Observable' {
  interface Observable<T> {
    partition: PartitionSignature<T>;
  }
}