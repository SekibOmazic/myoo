import { Observable } from '../Observable';
export declare function map<T, U>(projection: (val: T) => U): Observable<U>;
