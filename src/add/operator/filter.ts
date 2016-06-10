import {Observable} from '../../Observable';
import {filter} from '../../operator/filter';

Observable.prototype.filter = filter;

export interface FilterSignature<T> {
  (project: (value: T) => boolean): Observable<T>;
}

declare module '../../Observable' {
  interface Observable<T> {
    filter: FilterSignature<T>;
  }
}