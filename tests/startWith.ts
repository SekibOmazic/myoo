import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('StartWith', ()=> {

  it('should first emit the values passed to startWith method', (done) => {
    const expected = ['X', 0, 'A', 'A'];
    const a = Observable.interval(10).map(x=>'A').take(2);
    const input = a.startWith('X', 0);

    input.subscribe({
      next: (x:any) => {
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
    const expected = [0, 'A', 'A'];
    const a = Observable.interval(10).map(x=> {
      if (x === 1) {throw 'Ohhh';}
      else {return 'A';}
    }).take(3);

    const input = a.startWith(0);

    input.subscribe({
      next: (x: any) => {
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