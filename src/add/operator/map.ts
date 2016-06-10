import {Observable} from '../../Observable';
import {map} from '../../operator/map';

Observable.prototype.map = map;

export interface MapSignature<T> {
  <U>(project: (value: T) => U): Observable<U>;
}

declare module '../../Observable' {
  interface Observable<T> {
    map: MapSignature<T>;
  }
}