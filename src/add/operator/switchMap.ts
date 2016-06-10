import {Observable} from '../../Observable';
import {switchMap} from '../../operator/switchMap';

Observable.prototype.switchMap = switchMap;

export interface SwitchMapSignature<T> {
  <U>(project: (value: T) => Observable<U>): Observable<U>;
}

declare module '../../Observable' {
  interface Observable<T> {
    switchMap: SwitchMapSignature<T>;
  }
}