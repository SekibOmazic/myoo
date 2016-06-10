import { Observable } from '../../Observable';
export interface SwitchMapSignature<T> {
    <U>(project: (value: T) => Observable<U>): Observable<U>;
}
declare module '../../Observable' {
    interface Observable<T> {
        switchMap: SwitchMapSignature<T>;
    }
}
