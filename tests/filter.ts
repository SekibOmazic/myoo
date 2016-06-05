import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('Filter', ()=> {

  it('should only pass the values passing predicate function to the output stream', (done) => {
    const input = Observable.interval(50).filter((i: number) => i > 1).take(2);
    const expected = [2, 3];

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
    const source = Observable.interval(50).take(1);
    const input = source.filter(
      // make an error here
      x => (<string> <any> x).toLowerCase() === 'x'
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
    const source = Observable.interval(50).take(2);
    const input = source.filter(i => i > 0);
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
