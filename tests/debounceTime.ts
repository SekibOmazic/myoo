import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('DebounceTime', ()=> {

  it('should throw away all emitted values that take less then the specified time between output', (done) => {
    const input = Observable.of(1,2,3).debounceTime(100);
    const expected = [3];

    input.subscribe({
      next: (x:number) => {
        assert.equal(x, expected.shift());
      },
      error: (err:any) => done(err),
      complete: () => {
        assert.equal(expected.length, 0);
        done();
      }
    });
  });

});
