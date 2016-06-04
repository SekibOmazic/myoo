"use strict";
var core_1 = require('../core');
function _do(sideEffect) {
    var _this = this;
    return core_1.Observable.create(function (observer) {
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
core_1.Observable.prototype.do = _do;
//# sourceMappingURL=do.js.map