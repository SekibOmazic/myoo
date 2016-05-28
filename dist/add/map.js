"use strict";
var core_1 = require('../core');
function map(projection) {
    var _this = this;
    return core_1.Observable.create(function (observer) {
        var mapObserver = {
            next: function (x) { return observer.next(projection(x)); },
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
core_1.Observable.prototype.map = map;
//# sourceMappingURL=map.js.map