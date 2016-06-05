import { Observable } from '../core';
export declare function startWith(...values: Array<any>): Observable<any>;
export interface StartWithSignature {
    (...values: Array<any>): Observable<any>;
}
declare module '../core' {
    interface Observable<T> {
        startWith: StartWithSignature;
    }
}
