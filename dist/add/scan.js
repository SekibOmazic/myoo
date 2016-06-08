"use strict";
var core_1 = require('../core');
function scan(accumulator, seed) {
    var _this = this;
    return core_1.Observable.create(function (observer) {
        var index = 0;
        var acc = seed;
        var seedSet = !!acc;
        var scanObserver = {
            next: function (x) {
                try {
                    if (seedSet) {
                        acc = accumulator(acc, x, index++);
                    }
                    else {
                        acc = x;
                        seedSet = true;
                    }
                    observer.next(acc);
                }
                catch (e) {
                    observer.error(e);
                }
            },
            error: function (err) { return observer.error(err); },
            complete: function () { return observer.complete(); }
        };
        var subscription = _this.subscribe(scanObserver);
        return function () {
            subscription.unsubscribe();
        };
    });
}
exports.scan = scan;
core_1.Observable.prototype.scan = scan;
//# sourceMappingURL=scan.js.map