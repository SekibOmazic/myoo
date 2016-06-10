import { Observable } from '../Observable';
export declare function pluck<T, U>(...properties: Array<string>): Observable<U>;
export interface PluckSignature<T> {
    <U>(...properties: Array<string>): Observable<U>;
}
declare module '../Observable' {
    interface Observable<T> {
        pluck: PluckSignature<T>;
    }
}
