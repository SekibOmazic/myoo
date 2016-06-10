import { Observable } from '../../Observable';
export interface WithLatestFromSignature<T> {
    <U>(...observables: Array<any>): Observable<U>;
}
declare module '../../Observable' {
    interface Observable<T> {
        withLatestFrom: WithLatestFromSignature<T>;
    }
}
