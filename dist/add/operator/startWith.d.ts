import { Observable } from '../../Observable';
export interface StartWithSignature {
    (...values: Array<any>): Observable<any>;
}
declare module '../../Observable' {
    interface Observable<T> {
        startWith: StartWithSignature;
    }
}
