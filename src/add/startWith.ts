import {Observable} from '../Observable';
import {concat} from './concat';

export function startWith(...values: Array<any>): Observable<any> {
  const starter = Observable.fromArray(values);
  return concat.call(starter, this);
}

Observable.prototype.startWith = startWith;

export interface StartWithSignature {
  (...values: Array<any>): Observable<any>;
}

declare module '../Observable' {
  interface Observable<T> {
    startWith: StartWithSignature;
  }
}