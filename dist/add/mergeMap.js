"use strict";
var Observable_1 = require('../Observable');
/**
 * Projects each source value to an Observable which is merged in the output Observable.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+---------------
 *   \        \
 *    \       ----1----2---3--
 *    --a--b----c----d--------
 *             mergeMap
 * -----a--b----c-1--d-2---3--
 * ```
 *
 * @param projection Function that creates an observable for each value it gets as an input.
 * @return {Observable}
 */
function mergeMap(projection) {
    var _this = this;
    return Observable_1.Observable.create(function (observer) {
        var innerSubscriptions = [];
        var outer = null;
        outer = _this.subscribe({
            next: function (value) {
                // for the new value of outer stream invoke projection(value)
                // which will create another inner stream.
                // subscribe to this new inner stream and send its
                // values to the destination observer.
                // Also store the subscription into the innerSubscriptions
                var inner = projection(value).subscribe({
                    next: function (x) { return observer.next(x); },
                    error: function (err) { return observer.error(err); },
                    complete: function () {
                        // unsubscribe from this(inner) stream
                        if (inner && !inner.isUnsubscribed) {
                            inner.unsubscribe();
                        }
                        // if there is no more active streams signal complete to the observer
                        if (innerSubscriptions.filter(function (s) { return !s.isUnsubscribed; }).length === 0) {
                            observer.complete();
                        }
                    }
                });
                innerSubscriptions.push(inner);
            },
            error: function (err) { return observer.error(err); },
            complete: function () {
                // if all inner streams have stopped signal complete to the observer
                if (innerSubscriptions.filter(function (inner) { return !inner.isStopped; }).length === 0) {
                    observer.complete();
                }
            }
        });
        return function () {
            // release resources from all active inner streams
            innerSubscriptions.filter(function (subscription) { return !subscription.isUnsubscribed; })
                .forEach(function (subscription) { return subscription.unsubscribe(); });
            outer.unsubscribe();
        };
    });
}
exports.mergeMap = mergeMap;
Observable_1.Observable.prototype.mergeMap = mergeMap;
//# sourceMappingURL=mergeMap.js.map