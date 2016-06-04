import {Observable} from '../dist/Myoo';

import * as assert from 'assert';

describe('SkipUntil', ()=> {

  it('should start emitting values after the control stream sends its first value', (done) => {
    const expected = [4,5,6];

    const source = Observable.interval(10);
    const input = source.skipUntil(Observable.interval(50)).take(3);

    input.subscribe({
      next: (x:number) => {
        assert.equal(x, expected.shift());
      },
      error: (err:any) => done('should never be invoked'),
      complete: () => {
        assert.equal(0, expected.length);
        done();
      }
    });
  });

});