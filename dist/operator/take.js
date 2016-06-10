"use strict";
var Observable_1 = require('../Observable');
function take(total) {
    var _this = this;
    var counter = 0;
    return Observable_1.Observable.create(function (observer) {
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
//# sourceMappingURL=take.js.map