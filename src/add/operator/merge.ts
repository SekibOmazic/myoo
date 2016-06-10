import {Observable} from '../../Observable';
import {merge} from '../../operator/merge';

Observable.prototype.merge = merge;

export interface MergeSignature<T> {
  <U>(...observables: Array<Observable<any>>): Observable<U>;
}

declare module '../../Observable' {
  interface Observable<T> {
    merge: MergeSignature<T>;
  }
}