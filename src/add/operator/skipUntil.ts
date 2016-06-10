import {Observable} from '../../Observable';
import {skipUntil} from '../../operator/skipUntil';

Observable.prototype.skipUntil = skipUntil;

export interface SkipUntilSignature<T> {
  <U>(control: Observable<U>): Observable<T>;
}

declare module '../../Observable' {
  interface Observable<T> {
    skipUntil: SkipUntilSignature<T>;
  }
}