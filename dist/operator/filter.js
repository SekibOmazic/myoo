"use strict";
var Observable_1 = require('../Observable');
function filter(predicate) {
    var _this = this;
    return Observable_1.Observable.create(function (observer) {
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
//# sourceMappingURL=filter.js.map