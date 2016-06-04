import {Observable} from '../dist/Myoo';

import * as assert from 'assert';

describe('MergeMap', ()=> {

  it('should emmit the value of the current inner stream', (done) => {
    const expected = [0,10,20,0,30,10,40,20,30,40];

    const source = Observable.interval(25).take(2);
    const input = source.mergeMap(x => Observable.interval(10).map(x => x*10).take(5));

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