"use strict";
var core_1 = require('../core');
function switchMap(projection) {
    var _this = this;
    return core_1.Observable.create(function (observer) {
        var inner = null;
        var outer = null;
        outer = _this.subscribe({
            next: function (value) {
                // if there is a current inner stream unsubscribe from it
                if (inner && !inner.isUnsubscribed) {
                    inner.unsubscribe();
                }
                // for the new value of outer stream invoke projection(value)
                // which will create another inner stream.
                // subscribe to this new inner stream and send its
                // values to the destination observer
                inner = projection(value).subscribe({
                    next: function (x) { return observer.next(x); },
                    error: function (err) { return observer.error(err); },
                    complete: function () {
                        if (inner.isStopped) {
                            observer.complete();
                        }
                    }
                });
            },
            error: function (err) { return observer.error(err); },
            complete: function () {
                if (!inner || inner.isUnsubscribed) {
                    observer.complete();
                }
            }
        });
        return function () {
            if (inner && !inner.isUnsubscribed) {
                inner.unsubscribe();
            }
            outer.unsubscribe();
        };
    });
}
exports.switchMap = switchMap;
core_1.Observable.prototype.switchMap = switchMap;
//# sourceMappingURL=switchMap.js.map