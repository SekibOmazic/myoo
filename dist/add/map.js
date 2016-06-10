"use strict";
var Observable_1 = require('../Observable');
function map(projection) {
    var _this = this;
    return Observable_1.Observable.create(function (observer) {
        var mapObserver = {
            next: function (x) {
                try {
                    observer.next(projection(x));
                }
                catch (e) {
                    observer.error(e);
                }
            },
            error: function (err) { return observer.error(err); },
            complete: function () { return observer.complete(); }
        };
        var subscription = _this.subscribe(mapObserver);
        return function () {
            subscription.unsubscribe();
        };
    });
}
exports.map = map;
Observable_1.Observable.prototype.map = map;
//# sourceMappingURL=map.js.map