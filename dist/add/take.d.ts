import { Observable } from '../Observable';
export declare function take<T>(total: number): Observable<T>;
export interface TakeSignature<T> {
    (value: number): Observable<T>;
}
declare module '../Observable' {
    interface Observable<T> {
        take: TakeSignature<T>;
    }
}
