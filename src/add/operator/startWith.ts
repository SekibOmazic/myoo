import {Observable} from '../../Observable';
import {startWith} from '../../operator/startWith';

Observable.prototype.startWith = startWith;

export interface StartWithSignature {
  (...values: Array<any>): Observable<any>;
}

declare module '../../Observable' {
  interface Observable<T> {
    startWith: StartWithSignature;
  }
}