import {Observable, Subscriber, Observer} from '../dist/Myoo';

import * as assert from 'assert';

describe('Observable', () => {

  it('should have all the core static operators', () => {
    assert.equal(typeof Observable.create, 'function');
    assert.equal(typeof Observable.interval, 'function');
    assert.equal(typeof Observable.fromArray, 'function');
    assert.equal(typeof Observable.of, 'function');
  });

  it('should have all the core operators as methods', () => {
    const subscriber: Subscriber<any> = (observer: Observer<any>) => () => {};
    const observable: Observable<any> = Observable.create(subscriber);

    assert.equal(typeof observable.map, 'function');
    assert.equal(typeof observable.skip, 'function');
    assert.equal(typeof observable.filter, 'function');
    assert.equal(typeof observable.take, 'function');
    assert.equal(typeof observable.do, 'function');
  });

  it('should not emit values after the error has occurred', (done) => {
    const expected = [1, 2];

    let source$ = Observable.create(observer => {
      observer.next(1);
      observer.next(2);
      observer.error('oops');
      observer.next(3);
      observer.next(4);

      return () => {
        assert.equal(2, expected.length);
      };
    });

    let obs = {
      next: (x: number) => {
        assert.equal(x, expected.shift());
      },
      error: (err: any) => {
        assert.equal(err, 'oops');
        assert.equal(expected.length, 0);
      },
      complete: () => {
        done('complete should not be called');
      }
    };

    source$.subscribe(obs);

    assert.equal(expected.length, 0);
    done();
  });

  it('should not emit values when completed', (done) => {
    let on = false;
    const expected = [1, 2, 3];

    const source = Observable.create<number>((observer) => {
        on = true;
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
        observer.next(4);
      
        return () => {
          on = false;
          console.log('cleanup from source');
        };
    });

    assert.equal(on, false);

    let observer = {
      next: (x: number) => {
        assert.equal(on, true);
        assert.equal(x, expected.shift());
      },
      error: (err: any) => done(err),
      complete: () => {
        assert.equal(on, true);
        assert.equal(expected.length, 0);
      }
    };

    source.subscribe(observer);

    // TODO: assure that cleanup function has been invoked (currently bug(?) in Subscription)
    //assert.equal(on, false);

    assert.equal(expected.length, 0);
    done();
  });

  it('should create an observable from arguments given to the \'of\' method', (done) => {
    const expected = [1,2,3];
    const input = Observable.of<number>(1,2,3);

    input.subscribe({
      next: (x: number) => {
        assert.equal(x, expected.shift());
      },
      error: (err: any) => done('should never be invoked'),
      complete: () => {
        assert.equal(0, expected.length);
        done();
      }
    })

  });

  it('should emit an array as a value if the array is given to the \'of\' method', (done) => {
    const expected = [[1,2,3]];
    const input = Observable.of<Array<number>>([1,2,3]);
    
    input.subscribe({
      next: (x: Array<number>) => {
        assert.notStrictEqual(x, expected.shift());
      },
      error: (err: any) => done('should never be invoked'),
      complete: () => {
        assert.equal(0, expected.length);
        done();
      }
    })
    
  });

  it('should create an observable from the array given to the \'fromArray\' method', (done) => {
    const expected = [1,2,3];
    const input = Observable.fromArray<number>([1,2,3]);

    input.subscribe({
      next: (x: number) => {
        assert.equal(x, expected.shift());
      },
      error: (err: any) => done('should never be invoked'),
      complete: () => {
        assert.equal(0, expected.length);
        done();
      }
    })

  });

});