import { Observable } from '../../Observable';
export interface SkipUntilSignature<T> {
    <U>(control: Observable<U>): Observable<T>;
}
declare module '../../Observable' {
    interface Observable<T> {
        skipUntil: SkipUntilSignature<T>;
    }
}
