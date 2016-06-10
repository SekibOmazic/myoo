"use strict";
var Subscription_1 = require('./Subscription');
var Observable = (function () {
    function Observable(subscriber) {
        this.subscriber = subscriber;
    }
    Observable.create = function (subscriber) {
        return new Observable(subscriber);
    };
    /**
     * Converts an array to an Observable. The returned Observable will emit synchronously
     * all the items in the array, and then complete.
     *
     * Marble diagram:
     *
     * ```text
     * fromArray([1,2,3])
     * 123|
     * ```
     *
     * @param {Array} array The array to be converted as a stream.
     * @return {Observable}
     */
    Observable.fromArray = function (array) {
        var subscriber = function (observer) {
            array.forEach(function (item) { observer.next(item); });
            observer.complete();
            return function () { };
        };
        return new Observable(subscriber);
    };
    /**
     * Converts a promise to an observable. The returned observable will emit the resolved
     * value of the promise, and then complete. However, if the promise is
     * rejected, the observable will emit the corresponding error.
     *
     * Marble diagram:
     *
     * ```text
     * fromPromise( ----42 )
     * -----------------42|
     * ```
     *
     * @param {Promise} promise The promise to be converted to an observable.
     * @return {Observable}
     */
    Observable.fromPromise = function (promise) {
        var promiseSubscriber = function (observer) {
            promise
                .then(function (value) {
                observer.next(value);
                observer.complete();
            }, function (err) { return observer.error(err); })
                .then(null, function (err) {
                setTimeout(function () { throw err; });
            });
            return function () { };
        };
        return new Observable(promiseSubscriber);
    };
    /**
     * Creates a Stream that immediately emits the arguments that you give to
     * *of*, then completes.
     *
     * Marble diagram:
     *
     * ```text
     * of(1,2,3)
     * 123|
     * ```
     *
     * @param items Values you want to emit to the observer.
     * @return {Observable}
     */
    Observable.of = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        return Observable.fromArray(items);
    };
    Observable.interval = function (interval) {
        return Observable.create(function (observer) {
            var count = 0;
            var intervalId = setInterval(function () {
                observer.next(count++);
            }, interval);
            return function () {
                clearInterval(intervalId);
                if (observer.complete) {
                    observer.complete();
                }
            };
        });
    };
    Observable.range = function (from, to) {
        return Observable.create(function (observer) {
            var total = from + to;
            var counter = from;
            while (counter < total) {
                observer.next(counter++);
            }
            observer.complete();
            // cleanup function
            return function () { };
        });
    };
    Observable.prototype.subscribe = function (destination) {
        return new Subscription_1.Subscription(this.subscriber, destination);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map