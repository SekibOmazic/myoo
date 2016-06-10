import {Observable} from '../../Observable';
import {debounceTime} from '../../operator/debounceTime';

Observable.prototype.debounceTime = debounceTime;

export interface DebounceTimeSignature<T> {
  (dueTime: number): Observable<T>;
}

declare module '../../Observable' {
  interface Observable<T> {
    debounceTime: DebounceTimeSignature<T>;
  }
}