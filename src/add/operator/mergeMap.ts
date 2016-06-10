import {Observable} from '../../Observable';
import {mergeMap} from '../../operator/mergeMap';

Observable.prototype.mergeMap = mergeMap;

export interface MergeMapSignature<T> {
  <U>(project: (value: T) => Observable<U>): Observable<U>;
}

declare module '../../Observable' {
  interface Observable<T> {
    mergeMap: MergeMapSignature<T>;
  }
}