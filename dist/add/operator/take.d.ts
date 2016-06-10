import { Observable } from '../../Observable';
export interface TakeSignature<T> {
    (value: number): Observable<T>;
}
declare module '../../Observable' {
    interface Observable<T> {
        take: TakeSignature<T>;
    }
}
