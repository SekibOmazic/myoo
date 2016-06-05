import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('Merge', ()=> {

  it('should just pass the value from each observable', (done) => {
    const expected = ['B', 'B', 'A', 'B', 'B', 'A', 'B', 'B', 'A'];
    const a = Observable.interval(25).map(x=>'A').take(3);
    const b = Observable.interval(10).map(x=>'B').take(6);
    const input = a.merge(b);

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
    const expected = ['B', 'B', 'A', 'B'];
    const a = Observable.interval(25).map(x=>'A').take(3);
    const b = Observable.interval(10).map(x=> {
      if (x === 3) {throw 'Ohhh';}
      else {return 'B';}
    }).take(6);

    const input = a.merge(b);

    input.subscribe({
      next: (x:number) => {
        assert.equal(x, expected.shift());
      },
      error: (err:any) => {
        assert.notStrictEqual(err.match(/Ohhh$/), null);
        done();
      },
      complete: () => {
        done('Won\'t get here');
      }
    });
  });

});