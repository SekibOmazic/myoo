import { Observable } from '../../Observable';
export interface TakeUntilSignature<T> {
    <U>(control: Observable<U>): Observable<T>;
}
declare module '../../Observable' {
    interface Observable<T> {
        takeUntil: TakeUntilSignature<T>;
    }
}
