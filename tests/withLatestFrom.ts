import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('WithLatestFrom', ()=> {

  it('should combine with latest values from each input stream', (done) => {
    const expected = [['A', 1], ['B', 3], ['C', 3], ['D', 3], ['E', 3]];
    const arr1 = ['A', 'B', 'C', 'D', 'E'];
    const arr2 = [1,2,3,4,5];
    const a = Observable.interval(22).map(x => arr1[x]).take(5);
    const b = Observable.interval(11).map(x => arr2[x]).take(3);
    const input = a.withLatestFrom(b);

    input.subscribe({
      next: (x: Array<string>) => {
        assert.deepEqual(x, expected.shift());
      },
      error: (err: any) => done(err),
      complete: () => {
        assert.equal(0, expected.length);
        done();
      }
    });
  });

  it('should combine with latest values from each input stream using project function', (done) => {
    const expected = ['A1','B3','C3', 'D3', 'E3'];
    const combineFn = (a: string, b: number) => a + b;
    const arr1 = ['A', 'B', 'C', 'D', 'E'];
    const arr2 = [1,2,3,4,5];
    const a = Observable.interval(22).map(x=>arr1[x]).take(5);
    const b = Observable.interval(11).map(x=>arr2[x]).take(3);
    const input = a.withLatestFrom(b, combineFn);

    input.subscribe({
      next: (x: string) => {
        assert.equal(x, expected.shift());
      },
      error: (err: any) => done(err),
      complete: () => {
        assert.equal(0, expected.length);
        done();
      }
    });
  });

  it('should stop emitting values if any observable throws an exception', (done) => {
    const expected = ['A1', 'B3'];
    const arr1 = ['A', 'B', 'C', 'D', 'E'];
    const arr2 = [1,2,3,4,5];
    const combineFn = (a: string, b: number) => a + b;
    const a = Observable.interval(22).map(x => arr1[x]).take(5);
    const b = Observable.interval(11).map(x=> {
      if (x === 2) {throw 'Ohhh';}
      else {return arr2[x];}
    }).take(3);

    const input = a.withLatestFrom(b, combineFn);

    input.subscribe({
      next: (x: string) => {
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