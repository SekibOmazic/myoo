"use strict";
var core_1 = require('../core');
/**
 * Flattens an "observable of observables", handling only one nested stream at a time.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+---------------
 *   \        \
 *    \       ----1----2---3--
 *    --a--b----c----d--------
 *           switchMap
 * -----a--b------1----2---3--
 * ```
 *
 * @param projection Function that creates an observable for each value it gets as an input.
 * @return {Observable}
 */
function switchMap(projection) {
    var _this = this;
    return core_1.Observable.create(function (observer) {
        var inner = null;
        var outer = null;
        outer = _this.subscribe({
            next: function (value) {
                // if there is a current inner stream unsubscribe from it
                if (inner && !inner.isUnsubscribed) {
                    inner.unsubscribe();
                }
                // for the new value of outer stream invoke projection(value)
                // which will create another inner stream.
                // subscribe to this new inner stream and send its
                // values to the destination observer
                inner = projection(value).subscribe({
                    next: function (x) { return observer.next(x); },
                    error: function (err) { return observer.error(err); },
                    complete: function () {
                        if (inner.isStopped) {
                            observer.complete();
                        }
                    }
                });
            },
            error: function (err) { return observer.error(err); },
            complete: function () {
                if (!inner || inner.isUnsubscribed) {
                    observer.complete();
                }
            }
        });
        return function () {
            if (inner && !inner.isUnsubscribed) {
                inner.unsubscribe();
            }
            outer.unsubscribe();
        };
    });
}
exports.switchMap = switchMap;
core_1.Observable.prototype.switchMap = switchMap;
//# sourceMappingURL=switchMap.js.map