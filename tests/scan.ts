import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('Scan', ()=> {

  it('should apply accumulator function on each value from the observable', (done) => {
    const expected = [1,3,6,10,15];
    const accumulatorFn = (acc: number, curr: number) => acc + curr;
    const input = Observable.of<number>(1,2,3,4,5).scan(accumulatorFn);

    input.subscribe({
      next: (x: number) => {
        assert.equal(x, expected.shift());
      },
      error: (err: any) => done(err),
      complete: () => {
        assert.equal(0, expected.length);
        done();
      }
    });
  });

  it('should apply accumulator function on each value from the observable starting with given seed', (done) => {
    const expected = [11,13,16,20,25];
    const accumulatorFn = (acc: number, curr: number) => acc + curr;
    const input = Observable.of<number>(1,2,3,4,5).scan(accumulatorFn, 10);

    input.subscribe({
      next: (x: number) => {
        assert.equal(x, expected.shift());
      },
      error: (err: any) => done(err),
      complete: () => {
        assert.equal(0, expected.length);
        done();
      }
    });
  });

  it('should stop emitting values if accumulator function throws an exception', (done) => {
    const expected = [1,3,6];
    const accumulatorFn = (acc: number, curr: number) => {
      if (curr === 4) {throw 'Ohhh';}
      else { return acc + curr; }
    };
    const input = Observable.of<number>(1,2,3,4,5).scan(accumulatorFn);

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