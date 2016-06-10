import {Observable} from '../../Observable';
import {distinctUntilChanged} from '../../operator/distinctUntilChanged';

Observable.prototype.distinctUntilChanged = distinctUntilChanged;

export interface DistinctUntilChangedSignature<T> {
  (compare?: Function): Observable<T>;
}

declare module '../../Observable' {
  interface Observable<T> {
    distinctUntilChanged: DistinctUntilChangedSignature<T>;
  }
}
