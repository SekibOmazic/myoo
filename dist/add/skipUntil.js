"use strict";
var core_1 = require('../core');
function skipUntil(control) {
    var _this = this;
    return core_1.Observable.create(function (observer) {
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
core_1.Observable.prototype.skipUntil = skipUntil;
//# sourceMappingURL=skipUntil.js.map