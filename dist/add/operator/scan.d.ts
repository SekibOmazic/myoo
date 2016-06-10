import { Observable } from '../../Observable';
export interface ScanSignature<T> {
    <U>(accumulator: (acc: U, value: T, index?: number) => U, seed?: T | U): Observable<U>;
}
declare module '../../Observable' {
    interface Observable<T> {
        scan: ScanSignature<T>;
    }
}
