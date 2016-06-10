import { Observable } from '../../Observable';
export interface CombineLatestSignature<T> {
    <U>(...observables: Array<any>): Observable<U>;
}
declare module '../../Observable' {
    interface Observable<T> {
        combineLatest: CombineLatestSignature<T>;
    }
}
