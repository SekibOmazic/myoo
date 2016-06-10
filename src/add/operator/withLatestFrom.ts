import {Observable} from '../../Observable';
import {withLatestFrom} from '../../operator/withLatestFrom';

Observable.prototype.withLatestFrom = withLatestFrom;

export interface WithLatestFromSignature<T> {
  <U>(...observables: Array<any>): Observable<U>;
}

declare module '../../Observable' {
  interface Observable<T> {
    withLatestFrom: WithLatestFromSignature<T>;
  }
}