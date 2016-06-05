import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('Map', ()=> {

  it('should transform values from input stream to output stream', (done) => {
    const input = Observable.interval(100).map((i: number) => 10 * i).take(3);
    const expected = [0, 10, 20];

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

  it('should pass project function errors to observer.error()', (done) => {
    const source = Observable.interval(100).take(1);
    const input = source.map(
      // make an error here
      x => (<string> <any> x).toLowerCase()
    );

    input.subscribe({
      next: () => done('next should not be called'),
      error: (err) => {
        assert.notStrictEqual(err.message.match(/is not a function$/), null);
        done();
      },
      complete: () => {
        done('complete should not be called');
      },
    });
  });

  it('should clean up Operator producer when complete', (done) => {
    const source = Observable.interval(100).take(1);
    const input = source.map(i => i + 1);
    const expected = [1, 2, 3];

    input.subscribe({
      next: (x:number) => {
        assert.strictEqual(x, expected.shift());
      },
      error: (err:any) => done(err),
      complete: () => {
        assert.strictEqual(expected.length, 2);
        done();
      },
    });
  });

});
