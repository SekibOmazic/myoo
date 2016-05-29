"use strict";
var core_1 = require('../core');
function takeUntil(control) {
    var _this = this;
    return core_1.Observable.create(function (observer) {
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
core_1.Observable.prototype.takeUntil = takeUntil;
//# sourceMappingURL=takeUntil.js.map