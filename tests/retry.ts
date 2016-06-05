import {Observable} from '../src/Myoo';

import * as assert from 'assert';

describe('Retry', ()=> {

  it('should pass the value if the number of retries greater than number of failures', (done) => {
    let count = 0;
    let numberOfPassedValues = 0;
    const input = Observable.interval(100)
      .map(() => {
        if (++count <= 3) {
          throw(new Error('Bla error'));
        }
        return 42;
      })
      .retry(3)
      .take(1);
    
    input.subscribe({
      next: (x:number) => {
        assert.equal(x, 42);
        numberOfPassedValues++;
      },
      error: (err:any) => done(err),
      complete: () => {
        assert.equal(1, numberOfPassedValues);
        done();
      }
    });
  });

  it('should throw error if the number of retries is lower than number of failures', (done) => {
    let count = 0;
    let numberOfPassedValues = 0;
    const input = Observable.interval(100)
      .map(() => {
        if (++count <= 3) {
          throw(new Error('Bla error'));
        }
        return 42;
      })
      .retry(2)
      .take(1);

    input.subscribe({
      next: (x:number) => {
        done('next should not be called');
      },
      error: (err:any) => {
        assert.equal(numberOfPassedValues, 0);
        assert.notStrictEqual(err.message.match(/Bla error$/), null);
        done();
      },
      complete: () => {
        done('complete should not be called');
      }
    });
  });
  
});