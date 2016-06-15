import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('Partition', ()=> {

  it('should split observable in two based on passed predicate function', (done) => {
    const source = Observable.of(1,2,3,4,5,6);
    const [evens, odds] = source.partition(val => val % 2 === 0);
    const input = evens.merge(odds);

    const expected = [2, 4, 6, 1, 3, 5];

    input.subscribe({
      next: (x: number) => {
        assert.equal(x, expected.shift());
      },
      error: (err: any) => done(err),
      complete: () => {
        assert.equal(expected.length, 0);
        done();
      }
    });
  });

});
