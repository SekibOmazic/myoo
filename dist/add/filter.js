"use strict";
var core_1 = require('../core');
function filter(predicate) {
    var _this = this;
    return core_1.Observable.create(function (observer) {
        var filterObserver = {
            next: function (x) {
                try {
                    var result = predicate(x);
                    if (result)
                        observer.next(x);
                }
                catch (err) {
                    observer.error(err);
                    return;
                }
            },
            error: function (err) { return observer.error(err); },
            complete: function () { return observer.complete(); }
        };
        var subscription = _this.subscribe(filterObserver);
        return function () {
            subscription.unsubscribe();
        };
    });
}
exports.filter = filter;
core_1.Observable.prototype.filter = filter;
//# sourceMappingURL=filter.js.map