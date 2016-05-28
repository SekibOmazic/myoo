"use strict";
var core_1 = require('../core');
function take(total) {
    var _this = this;
    var counter = 0;
    return core_1.Observable.create(function (observer) {
        var takeObserver = {
            next: function (x) {
                if (++counter <= total) {
                    observer.next(x);
                    if (counter === total) {
                        observer.complete();
                    }
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
exports.take = take;
core_1.Observable.prototype.take = take;
//# sourceMappingURL=take.js.map