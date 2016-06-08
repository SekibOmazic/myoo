import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('CombineLatest', ()=> {

  it('should combine latest values from each input stream', (done) => {
    const expected = [['A', 'B'], ['A', 'B'], ['A', 'B'], ['A', 'B'], ['A', 'B'],['A', 'B']];
    const a = Observable.interval(20).map(x=>'A').take(2);
    const b = Observable.interval(13).map(x=>'B').take(5);
    const input = a.combineLatest(b);

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

  it('should combine latest values from each input stream using project function', (done) => {
    const expected = ['AB','AB','AB','AB','AB','AB'];
    const combineFn = (a: string, b: string) => a + b;
    const a = Observable.interval(20).map(x=>'A').take(2);
    const b = Observable.interval(13).map(x=>'B').take(5);
    const input = a.combineLatest(b, combineFn);

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

  it('should stop passing values if any observable throws an exception', (done) => {
    const expected = ['AB', 'AB', 'AB', 'AB'];
    const combineFn = (a: string, b: string) => a + b; 
    const a = Observable.interval(20).map(x=>'A').take(2);
    const b = Observable.interval(13).map(x=> {
      if (x === 3) {throw 'Ohhh';}
      else {return 'B';}
    }).take(5);

    const input = a.combineLatest(b, combineFn);

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