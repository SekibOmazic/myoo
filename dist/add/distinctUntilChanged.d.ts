import { Observable } from '../core';
export declare function distinctUntilChanged<T>(compare?: Function): Observable<T>;
export interface DistinctUntilChangedSignature<T> {
    (compare?: Function): Observable<T>;
}
declare module '../core' {
    interface Observable<T> {
        distinctUntilChanged: DistinctUntilChangedSignature<T>;
    }
}
