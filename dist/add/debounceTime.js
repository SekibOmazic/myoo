"use strict";
var core_1 = require('../core');
function cleanup(timerId) {
    if (timerId) {
        clearTimeout(timerId);
        timerId = null;
    }
}
function debounceTime(dueTime) {
    var _this = this;
    return core_1.Observable.create(function (observer) {
        var debounceTimer;
        var current = null;
        var debounceTimeObserver = {
            next: function (x) {
                current = x;
                // clear scheduled task, if we have one
                cleanup(debounceTimer);
                // schedule new task
                debounceTimer = setTimeout(function () {
                    observer.next(current);
                }, dueTime);
            },
            error: function (err) { return observer.error(err); },
            complete: function () {
                var hasValueScheduled = debounceTimer != null;
                cleanup(debounceTimer);
                // emit the last value if we have one scheduled
                if (hasValueScheduled) {
                    observer.next(current);
                }
                // complete
                observer.complete();
            }
        };
        var subscription = _this.subscribe(debounceTimeObserver);
        return function () {
            // cleanup internal timeout
            cleanup(debounceTimer);
            subscription.unsubscribe();
        };
    });
}
exports.debounceTime = debounceTime;
core_1.Observable.prototype.debounceTime = debounceTime;
//# sourceMappingURL=debounceTime.js.map