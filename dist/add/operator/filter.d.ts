import { Observable } from '../../Observable';
export interface FilterSignature<T> {
    (project: (value: T) => boolean): Observable<T>;
}
declare module '../../Observable' {
    interface Observable<T> {
        filter: FilterSignature<T>;
    }
}
