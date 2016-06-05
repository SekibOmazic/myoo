import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('DistinctUntilChanged', ()=> {

  it('should pass the current value only if different from the last one', (done) => {
    const source = [1, 1, 2, 3];
    const input = Observable.interval(100).map(i => source[i]).take(4).distinctUntilChanged();
    const expected = [1, 2, 3];

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

  it('should use compare function and pass the current value only if different from the last one', (done) => {
    const compare = (x:number, y:number) => x*2 === y*2;
    const source = [1, 1, 2, 3];
    const input = Observable.interval(100).map(i => source[i]).take(4).distinctUntilChanged(compare);
    const expected = [1, 2, 3];

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