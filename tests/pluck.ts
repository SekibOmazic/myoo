import {Observable} from '../dist/Myoo';

import * as assert from 'assert';

describe('Pluck', ()=> {

  it('should pick one of the nested properties of every emitted object', (done) => {
    const countries = [{name: 'Bosnia', population: '4 Mio'}, {name: 'Germany', population: '82 Mio'}];

    const source = Observable.interval(10).map(i => countries[i]).take(2);
    const input = source.pluck('name');
    const expected = ['Bosnia', 'Germany'];

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

  it('should return undefined for the property not found in emitted object', (done) => {
    const people = [
      {name: 'Joe', age: 30, job: {title: 'Developer', language: 'JavaScript'}},
      //will return undefined when no job is found
      {name: 'Jane', age:35}
    ];

    const source = Observable.interval(10).map(i => people[i]).take(2);
    const input = source.pluck('job', 'title');
    const expected = ['Developer', undefined];

    input.subscribe({
      next: (x:any) => {
        assert.equal(x, expected.shift());
      },
      error: (err:any) => done(err),
      complete: () => {
        assert.equal(expected.length, 0);
        done();
      }
    });
  });

});
