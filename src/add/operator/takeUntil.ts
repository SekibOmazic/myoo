import {Observable} from '../../Observable';
import {takeUntil} from '../../operator/takeUntil';

Observable.prototype.takeUntil = takeUntil;

export interface TakeUntilSignature<T> {
  <U>(control: Observable<U>): Observable<T>;
}

declare module '../../Observable' {
  interface Observable<T> {
    takeUntil: TakeUntilSignature<T>;
  }
}