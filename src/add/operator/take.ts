import {Observable} from '../../Observable';
import {take} from '../../operator/take';

Observable.prototype.take = take;

export interface TakeSignature<T> {
  (value: number): Observable<T>;
}

declare module '../../Observable' {
  interface Observable<T> {
    take: TakeSignature<T>;
  }
}