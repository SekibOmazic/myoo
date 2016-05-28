import { Observable } from '../core';
export declare type Predicate<T> = (val: T) => boolean;
export declare function filter<T>(predicate: Predicate<T>): Observable<T>;
export interface FilterSignature<T> {
    (project: (value: T) => boolean): Observable<T>;
}
declare module '../core' {
    interface Observable<T> {
        filter: FilterSignature<T>;
    }
}
