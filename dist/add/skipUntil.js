"use strict";
var Observable_1 = require('../Observable');
/**
 * Ignores the events from the input stream until the control Observable emits
 * first event and then starts forwarding events to the output.
 *
 * Marble diagram:
 *
 * ```text
 * --a---b---c-----d---e----
 *   skipUntil( --a---b--| )
 * ----------------d---e----
 * ```
 *
 * @param {Observable} control An Observable of events to ignore from the input stream.
 * @return {Observable}
 */
function skipUntil(control) {
    var _this = this;
    return Observable_1.Observable.create(function (observer) {
        var outer = null;
        var controlSubscription = null;
        var readyToEmit = false;
        var controlObserver = {
            next: function (x) {
                readyToEmit = true;
                controlSubscription.unsubscribe();
            },
            error: function (err) { return observer.error(err); },
            complete: function () { } //observer.complete()
        };
        controlSubscription = control.subscribe(controlObserver);
        outer = _this.subscribe({
            next: function (value) {
                if (readyToEmit) {
                    observer.next(value);
                }
            },
            error: function (err) { return observer.error(err); },
            complete: function () { return observer.complete(); }
        });
        return function () {
            outer.unsubscribe();
            controlSubscription.unsubscribe();
        };
    });
}
exports.skipUntil = skipUntil;
Observable_1.Observable.prototype.skipUntil = skipUntil;
//# sourceMappingURL=skipUntil.js.map