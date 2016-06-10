"use strict";
var Observable_1 = require('../Observable');
/**
 * Uses another Observable to determine when to complete the current one.
 *
 * When the given `control` stream emits an event or completes, the output
 * stream will complete. Before that happens, the output stream will just
 * pass values from the input observable.
 *
 * Marble diagram:
 *
 * ```text
 * ---1---2-----3--4----5----6---
 *   takeUntil( ------a--b--| )
 * ---1---2-----3--4--|
 * ```
 *
 * @param control Some other stream that is used to know when should the output
 * stream of this operator complete.
 * @return {Observable}
 */
function takeUntil(control) {
    var _this = this;
    return Observable_1.Observable.create(function (observer) {
        var source = _this.subscribe(observer);
        var innerObserver = {
            next: function (x) { return observer.complete(); },
            error: function (err) { return observer.error(err); },
            complete: function () { return observer.complete(); }
        };
        var input = control.subscribe(innerObserver);
        return function () {
            source.unsubscribe();
            input.unsubscribe();
        };
    });
}
exports.takeUntil = takeUntil;
//# sourceMappingURL=takeUntil.js.map