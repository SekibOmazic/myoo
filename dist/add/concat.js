"use strict";
var Observable_1 = require('../Observable');
/**
 * Concatenates multiple Observables together by sequentially emitting their values,
 * one Observable after the other.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2--|
 *           --b---c---d--|
 *         concat
 * --1----2----b---c---d--|
 * ```
 *
 * @param {Observable} observables An array of Observables to be merged together.
 * @return {Observable}
 */
function concat() {
    var _this = this;
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return Observable_1.Observable.create(function (observer) {
        var subscription = null;
        var others = observables.slice();
        var concatObserver = {
            next: function (x) {
                try {
                    observer.next(x);
                }
                catch (e) {
                    observer.error(e);
                }
            },
            error: function (err) { return observer.error(err); },
            complete: function () {
                if (others.length > 0) {
                    // subscribe to the next available observable
                    subscription = others.shift().subscribe(concatObserver);
                }
                else {
                    // no more observables left - send complete signal to the observer
                    observer.complete();
                }
            }
        };
        subscription = _this.subscribe(concatObserver);
        return function () {
            subscription.unsubscribe();
            subscription = null;
        };
    });
}
exports.concat = concat;
Observable_1.Observable.prototype.concat = concat;
//# sourceMappingURL=concat.js.map