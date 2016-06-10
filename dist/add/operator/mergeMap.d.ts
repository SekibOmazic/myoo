import { Observable } from '../../Observable';
export interface MergeMapSignature<T> {
    <U>(project: (value: T) => Observable<U>): Observable<U>;
}
declare module '../../Observable' {
    interface Observable<T> {
        mergeMap: MergeMapSignature<T>;
    }
}
