import {Observable, isObservable} from '../core';
import {concat} from './concat';

export function startWith<T, U>(value: U | Observable<U>): Observable<U> {
  const starter = isObservable(value) ? value : Observable.of<U>(value);
  return concat.call(starter, this);
}

Observable.prototype.startWith = startWith;

export interface StartWithSignature<T> {
  <U>(value: U | Observable<U>): Observable<U>;
}

declare module '../core' {
  interface Observable<T> {
    startWith: StartWithSignature<T>;
  }
}