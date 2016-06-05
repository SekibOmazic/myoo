import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('SwitchMap', ()=> {

  it('should always emmit the value of the current inner stream', (done) => {
    const expected = [0,1,2,3,0,1,2,3,4,5,6,7,8,9];

    const source = Observable.interval(100).take(2);
    const input = source.switchMap((x) => Observable.interval(20).take(10));

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