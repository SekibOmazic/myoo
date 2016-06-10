import {Observable} from '../../Observable';
import {concat} from '../../operator/concat';

Observable.prototype.concat = concat;

export interface ConcatSignature<T> {
  <U>(...observables: Array<Observable<any>>): Observable<U>;
}

declare module '../../Observable' {
  interface Observable<T> {
    concat: ConcatSignature<T>;
  }
}