import {Observable} from '../../Observable';
import {scan} from '../../operator/scan';

Observable.prototype.scan = scan;

export interface ScanSignature<T> {
  <U>(accumulator: (acc: U, value: T, index?: number) => U, seed?: T | U): Observable<U>;
}

declare module '../../Observable' {
  interface Observable<T> {
    scan: ScanSignature<T>;
  }
}