import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('Buffer', ()=> {

  it('should buffer values and emit them when the control triggers', (done) => {
    const expected = [[0], [1,2], [3,4]];

    var control = Observable.interval(100);
    var source = Observable.interval(50).take(6);
    const input = source.buffer(control);

    input.subscribe({
      next: (x: number[]) => {
        assert.deepEqual(x, expected.shift());
      },
      error: (err: any) => done('should never be invoked'),
      complete: () => {
        assert.equal(0, expected.length);
        done();
      }
    });
  });

});