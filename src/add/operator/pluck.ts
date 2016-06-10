import {Observable} from '../../Observable';
import {pluck} from '../../operator/pluck';

Observable.prototype.pluck = pluck;

export interface PluckSignature<T> {
  <U>(...properties: Array<string>): Observable<U>;
}

declare module '../../Observable' {
  interface Observable<T> {
    pluck: PluckSignature<T>;
  }
}