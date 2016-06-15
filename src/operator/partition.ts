import {Observable} from '../Observable';
import {filter} from './filter';

const not = <T>(fn: (val: T) => boolean) => (x: T) => !fn(x);

/**
 * Splits the source Observable into two, one with values that satisfy a predicate,
 * and another with values that don't satisfy the predicate.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--3--4--5--6--7--8--|
 *         partition
 * --1-----3-----5-----7-----|
 * -----2-----4-----6-----8--|
 *
 * @param predicate A function that evaluates each value emitted by the source Observable.
 *                  If it returns true, the value is emitted on the first Observable in the returned array,
 *                  if false the value is emitted on the second Observable in the array.
 * @returns [Observable<T>, Observable<T>]
 */
export function partition<T>(predicate: (val: T) => boolean): [Observable<T>, Observable<T>] {

  return [
    filter.call(this, predicate),
    filter.call(this, not(predicate))
  ];

}
