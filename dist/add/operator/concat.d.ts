import { Observable } from '../../Observable';
export interface ConcatSignature<T> {
    <U>(...observables: Array<Observable<any>>): Observable<U>;
}
declare module '../../Observable' {
    interface Observable<T> {
        concat: ConcatSignature<T>;
    }
}
