import {Observable} from '../../Observable';
import {retry} from '../../operator/retry';

Observable.prototype.retry = retry;

export interface RetrySignature<T> {
  (value: number): Observable<T>;
}

declare module '../../Observable' {
  interface Observable<T> {
    retry: RetrySignature<T>;
  }
}