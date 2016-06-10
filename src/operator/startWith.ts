import {Observable} from '../Observable';
import {concat} from './concat';

export function startWith(...values: Array<any>): Observable<any> {
  const starter = Observable.fromArray(values);
  return concat.call(starter, this);
}
