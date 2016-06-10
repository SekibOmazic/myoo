"use strict";
var Observable_1 = require('../Observable');
function retry(maxTries) {
    var _this = this;
    if (maxTries === void 0) { maxTries = 0; }
    return Observable_1.Observable.create(function (observer) {
        var subscription;
        var retryObserver = {
            next: function (x) { return observer.next(x); },
            error: function (err) {
                if (subscription) {
                    subscription.unsubscribe();
                }
                if (maxTries > 0) {
                    maxTries--;
                    subscription = _this.subscribe(retryObserver);
                }
                else {
                    observer.error(err);
                }
            },
            complete: function () { return observer.complete(); }
        };
        subscription = _this.subscribe(retryObserver);
        return function () {
            subscription.unsubscribe();
        };
    });
}
exports.retry = retry;
Observable_1.Observable.prototype.retry = retry;
//# sourceMappingURL=retry.js.map