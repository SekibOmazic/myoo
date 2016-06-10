"use strict";
var Subscription = (function () {
    function Subscription(subscriber, destination) {
        var _this = this;
        this.subscriber = subscriber;
        this.isUnsubscribed = false;
        this.isStopped = false;
        var observer = {
            next: function (data) {
                if (!_this.isStopped && destination.next) {
                    destination.next(data);
                }
            },
            error: function (err) {
                if (!_this.isStopped) {
                    _this.isStopped = true;
                    if (destination.error) {
                        destination.error(err);
                    }
                    _this.unsubscribe();
                }
            },
            complete: function () {
                if (!_this.isStopped) {
                    _this.isStopped = true;
                    if (destination.complete) {
                        destination.complete();
                    }
                    _this.unsubscribe();
                }
            }
        };
        var cleanupFn = subscriber(observer);
        if (typeof cleanupFn === 'function') {
            this.cleanup = cleanupFn;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        if (this.isUnsubscribed) {
            return;
        }
        this.isStopped = true;
        this.isUnsubscribed = true;
        if (this.cleanup) {
            this.cleanup();
        }
    };
    return Subscription;
}());
exports.Subscription = Subscription;
//# sourceMappingURL=Subscription.js.map