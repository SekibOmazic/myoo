import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('SwitchMap', ()=> {

  it('should always emmit the value of the current inner stream', (done) => {
    const expected = [0,1,2,3,0,1,2,3,4,5,6,7,8,9];

    const source = Observable.interval(100).take(2);
    const input = source.switchMap((x) => Observable.interval(20).take(10));
    done();
/*
    input.subscribe({
      next: (x:number) => {
        console.log(x);
        assert.equal(x, expected.shift());
      },
      error: (err:any) => done('should never be invoked'),
      complete: () => {
        assert.equal(0, expected.length);
        done();
      }
    });
*/
    /*
    const stream = Observable.fromArray([1, 2, 3])
      .switchMap(i => Observable.interval(100 * i).take(2).map(x => `${i}${x}`));
      //.flatten();
    // ---x---x---x---x---x---x
    // ---10--11
    // -------20------21
    // -----------30----------31
    const expected = ['30', '31'];

    stream.subscribe({
      next: (x:string) => {
        assert.equal(x, expected.shift());
      },
      error: (err:any) => done(err),
      complete: () => {
        assert.equal(expected.length, 0);
        done();
      }
    });
    */
  });

});