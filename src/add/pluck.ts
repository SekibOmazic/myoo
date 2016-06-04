import {Observable} from '../core';
import {map} from './map';

function propertyPlucker<T>(properties: string[]) {
  const mapperFn = (x: T) => {
    // start with the root object
    let current: any = x;

    // iterate over the properties
    properties.forEach((prop, idx) => {
      if (current !== undefined) {
        const propFound = current[properties[idx]];
        if (typeof propFound !== 'undefined') {
          current = propFound;
        } else {
          current = undefined;
        }
      }
    });

    return current;
  };

  return mapperFn;
}

export function pluck<T, U>(...properties: Array<string>): Observable<U> {
  if (properties.length === 0) {
    throw new Error('List of properties is empty. Please provide some.');
  }
  return map.call(this, propertyPlucker(properties));
}

Observable.prototype.pluck = pluck;

export interface PluckSignature<T> {
  <U>(...properties: Array<string>): Observable<U>;
}

declare module '../core' {
  interface Observable<T> {
    pluck: PluckSignature<T>;
  }
}