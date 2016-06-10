import { Observable } from '../Observable';
export declare function startWith(...values: Array<any>): Observable<any>;
export interface StartWithSignature {
    (...values: Array<any>): Observable<any>;
}
declare module '../Observable' {
    interface Observable<T> {
        startWith: StartWithSignature;
    }
}
