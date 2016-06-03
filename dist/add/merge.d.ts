import { Observable } from '../core';
export declare function merge<T, U>(...observables: Array<Observable<any>>): Observable<U>;
export interface MergeSignature<T> {
    <U>(...observables: Array<Observable<any>>): Observable<U>;
}
declare module '../core' {
    interface Observable<T> {
        merge: MergeSignature<T>;
    }
}
