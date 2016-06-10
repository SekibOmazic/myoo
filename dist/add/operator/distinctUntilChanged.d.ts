import { Observable } from '../../Observable';
export interface DistinctUntilChangedSignature<T> {
    (compare?: Function): Observable<T>;
}
declare module '../../Observable' {
    interface Observable<T> {
        distinctUntilChanged: DistinctUntilChangedSignature<T>;
    }
}
