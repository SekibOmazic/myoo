import { Observable } from '../Observable';
export declare function distinctUntilChanged<T>(compare?: Function): Observable<T>;
export interface DistinctUntilChangedSignature<T> {
    (compare?: Function): Observable<T>;
}
declare module '../Observable' {
    interface Observable<T> {
        distinctUntilChanged: DistinctUntilChangedSignature<T>;
    }
}
