"use strict";
var Observable_1 = require('../Observable');
function distinctUntilChanged(compare) {
    var _this = this;
    return Observable_1.Observable.create(function (observer) {
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
Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map