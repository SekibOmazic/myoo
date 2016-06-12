import {Observable} from '../../Observable';
import {buffer} from '../../operator/buffer';

Observable.prototype.buffer = buffer;

export interface BufferSignature<T> {
  <U>(control: Observable<U>): Observable<T[]>;
}

declare module '../../Observable' {
  interface Observable<T> {
    buffer: BufferSignature<T>;
  }
}