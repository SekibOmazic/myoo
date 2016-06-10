import {Observable} from '../../Observable';
import {skip} from '../../operator/skip';

Observable.prototype.skip = skip;

export interface SkipSignature<T> {
  (value: number): Observable<T>;
}

declare module '../../Observable' {
  interface Observable<T> {
    skip: SkipSignature<T>;
  }
}