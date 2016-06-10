"use strict";
var Observable_1 = require('../Observable');
function _do(sideEffect) {
    var _this = this;
    return Observable_1.Observable.create(function (observer) {
        var doObserver = {
            next: function (x) {
                try {
                    sideEffect(x);
                    observer.next(x);
                }
                catch (e) {
                    observer.error(e);
                }
            },
            error: function (err) { return observer.error(err); },
            complete: function () { return observer.complete(); }
        };
        var subscription = _this.subscribe(doObserver);
        return function () {
            subscription.unsubscribe();
        };
    });
}
exports._do = _do;
//# sourceMappingURL=do.js.map