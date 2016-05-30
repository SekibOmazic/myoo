"use strict";
var core_1 = require('../core');
function distinctUntilChanged(compare) {
    var _this = this;
    return core_1.Observable.create(function (observer) {
        var last;
        var compareFn;
        if (typeof compare === 'function') {
            compareFn = compare;
        }
        else {
            compareFn = function (last, current) { return last === current; };
        }
        var distinctObserver = {
            next: function (x) {
                var equal = compareFn(last, x);
                if (!equal) {
                    last = x;
                    observer.next(x);
                }
            },
            error: function (err) { return observer.error(err); },
            complete: function () { return observer.complete(); }
        };
        var subscription = _this.subscribe(distinctObserver);
        return function () {
            subscription.unsubscribe();
        };
    });
}
exports.distinctUntilChanged = distinctUntilChanged;
core_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map