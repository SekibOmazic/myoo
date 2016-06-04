import { Observable } from '../core';
export declare function filter<T>(predicate: (val: T) => boolean): Observable<T>;
export interface FilterSignature<T> {
    (project: (value: T) => boolean): Observable<T>;
}
declare module '../core' {
    interface Observable<T> {
        filter: FilterSignature<T>;
    }
}
