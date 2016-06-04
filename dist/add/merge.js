"use strict";
var core_1 = require('../core');
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
 * @param {Observable} stream1 A stream to merge together with other streams.
 * @param {Observable} stream2 A stream to merge together with other streams. One
 * or more streams may be given as arguments.
 * @return {Observable}
 */
function merge() {
    var _this = this;
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return core_1.Observable.create(function (observer) {
        var subscriptions = [];
        // TODO: prepend only if "this" is an Observable
        // prepend this observable
        observables.unshift(_this);
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
core_1.Observable.prototype.merge = merge;
//# sourceMappingURL=merge.js.map