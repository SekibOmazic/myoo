import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('Concat', ()=> {

  it('should just pass the value from each observable sequentially', (done) => {
    const expected = ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C'];
    const a = Observable.interval(10).map(x=>'A').take(3);
    const b = Observable.interval(10).map(x=>'B').take(3);
    const c = Observable.interval(10).map(x=>'C').take(3);
    const input = a.concat(b, c);

    input.subscribe({
      next: (x:number) => {
        assert.equal(x, expected.shift());
      },
      error: (err:any) => done(err),
      complete: () => {
        assert.equal(0, expected.length);
        done();
      }
    });
  });

  it('should stop passing values if any observable throws an exception', (done) => {
    const expected = ['A', 'A', 'A', 'B'];
    const a = Observable.interval(25).map(x=>'A').take(3);
    const b = Observable.interval(10).map(x=> {
      if (x === 1) {throw 'Ohhh';}
      else {return 'B';}
    }).take(3);

    const input = a.concat(b);

    input.subscribe({
      next: (x: number) => {
        assert.equal(x, expected.shift());
      },
      error: (err: any) => {
        assert.notStrictEqual(err.match(/Ohhh$/), null);
        done();
      },
      complete: () => {
        done('Won\'t get here');
      }
    });
  });

});