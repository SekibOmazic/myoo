import { Observable } from '../../Observable';
export interface MergeSignature<T> {
    <U>(...observables: Array<Observable<any>>): Observable<U>;
}
declare module '../../Observable' {
    interface Observable<T> {
        merge: MergeSignature<T>;
    }
}
