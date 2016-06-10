"use strict";
var Observable_1 = require('../Observable');
/**
 * Merges multiple streams together, emitting events from all of them
 * concurrently.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 * ----a-----b----c---d------
 *            merge
 * --1-a--2--b--3-c---d--4---
 * ```
 *
 * @param {Observable} observables An array of Observables to be merged together.
 * @return {Observable}
 */
function merge() {
    var _this = this;
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return Observable_1.Observable.create(function (observer) {
        var subscriptions = [];
        // prepend this observable
        if (_this instanceof Observable_1.Observable) {
            observables.unshift(_this);
        }
        // subscribe to each observable
        observables.forEach(function (observable) {
            var s = observable.subscribe({
                next: function (value) {
                    observer.next(value);
                },
                error: function (err) { observer.error(err); },
                complete: function () {
                    if (s && !s.isUnsubscribed) {
                        s.unsubscribe();
                    }
                    if (subscriptions.filter(function (s) { return !s.isUnsubscribed; }).length === 0) {
                        observer.complete();
                    }
                }
            });
            subscriptions.push(s);
        });
        return function () {
            // take all unsubscribed and call unsubscribe() on them
            subscriptions.filter(function (s) { return !s.isUnsubscribed; }).forEach(function (s) { return s.unsubscribe(); });
            subscriptions = null;
        };
    });
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map