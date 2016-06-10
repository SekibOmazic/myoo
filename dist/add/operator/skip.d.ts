import { Observable } from '../../Observable';
export interface SkipSignature<T> {
    (value: number): Observable<T>;
}
declare module '../../Observable' {
    interface Observable<T> {
        skip: SkipSignature<T>;
    }
}
