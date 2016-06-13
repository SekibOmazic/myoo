```text
 _ __ ___ __  __ ___   ___
| '_ ` _ \  \/ /` _  \/ _  \
| | | | | |   /| (_| | (_| |
|_| |_| |_|__|  \___/ \___/

```


# Make your own observables

This is my attempt to implement the [ECMAScript Observable proposal](https://github.com/zenparsing/es-observable)

It is heavily inspired by the [Ben Lesh's artice](https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87) 
and [RxJS](https://github.com/ReactiveX/rxjs). 

One big difference to the [RxJS](https://github.com/ReactiveX/rxjs) is that RxJS uses the `lift` operator to create 
an observable and has far less (none?) closures.

## Why?

Well I just want the truly understand Observables and thought the good way would be to implement them. This is very 
simple implementation and by far not complete. For the production you would probably want to use [RxJS](https://github.com/ReactiveX/rxjs)


# Installation

### ES6 via npm

```sh
npm install myoo
```

To import everything:

```js
import * as Myoo from 'myoo/Myoo';

Myoo.Observable.of(1,2,3)
```

To import only what you need (Observable will be patched):

```js
import {Observable} from 'myoo/Observable';
import 'myoo/add/operator/map';

Observable.of(1,2,3).map(x => x + '!!!'); // etc
```

To import what you need and use it with ES next function bind:

```js
import {Observable} from 'myoo/Observable';
import {map} from 'myoo/operator/map';

Observable.of(1,2,3)::map(x => x + '!!!'); // etc
```


### CommonJS via npm

```sh
npm install myoo
```

To import everything:

```js
var Myoo = require('myoo/Myoo');

Myoo.Observable.of(1,2,3)
```

To import only what you need (Observable will be patched):

```js
let Observable = require('myoo/Observable').Observable;
require('myoo/add/operator/map');

Observable.of(1,2,3).map(x => x + '!!!'); // etc
```

To import an operator and use it manually, do following:

```js
var Observable = require('myoo/Observable').Observable;
var map = require('myoo/operator/map').map;

map.call(Observable.of(1,2,3), function (x) { return x + '!!!'; });
```

### CDN
For CDN, you can use npmcdn:

[https://npmcdn.com/myoo@0.0.14/bundles/Myoo.js](https://npmcdn.com/myoo@0.0.14/bundles/Myoo.js)


# API

TODO


# To be implemented

- Observable.prototype `[@@observable]()`
- `Observable.from(x)`
- More operators (and tests)
- Also use `lift` Operator concept to get rid of all those closures
- Add `hot observables` (maybe based on [another Ben Lesh's article](https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339)

# License

[MIT](https://github.com/SekibOmazic/myoo/blob/master/LICENSE)
