import {Observable} from '../../Observable';
import {combineLatest} from '../../operator/combineLatest';

Observable.prototype.combineLatest = combineLatest;

export interface CombineLatestSignature<T> {
  <U>(...observables: Array<any>): Observable<U>;
}

declare module '../../Observable' {
  interface Observable<T> {
    combineLatest: CombineLatestSignature<T>;
  }
}