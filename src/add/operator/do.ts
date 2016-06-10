import {Observable} from '../../Observable';
import{_do} from '../../operator/do';

Observable.prototype.do = _do;

export interface DoSignature<T> {
  (sideEffect: (val: T) => any): Observable<T>;
}

declare module '../../Observable' {
  interface Observable<T> {
    do: DoSignature<T>;
  }
}