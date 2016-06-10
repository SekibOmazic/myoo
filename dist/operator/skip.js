"use strict";
var Observable_1 = require('../Observable');
/**
 * Ignores the first `total` many events from the input stream, and then
 * after that starts forwarding events from the input stream to the output
 * stream.
 *
 * Marble diagram:
 *
 * ```text
 * --a---b--c----d---e--
 *       skip(3)
 * --------------d---e--
 * ```
 *
 * @param {number} total Number of events to ignore from the input stream.
 * @return {Observable}
 */
function skip(total) {
    var _this = this;
    var counter = 0;
    return Observable_1.Observable.create(function (observer) {
        var takeObserver = {
            next: function (x) {
                if (counter++ >= total) {
                    observer.next(x);
                }
            },
            error: function (err) { return observer.error(err); },
            complete: function () { return observer.complete(); }
        };
        var subscription = _this.subscribe(takeObserver);
        return function () {
            subscription.unsubscribe();
        };
    });
}
exports.skip = skip;
//# sourceMappingURL=skip.js.map