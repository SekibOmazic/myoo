"use strict";
var core_1 = require('../core');
/**
 * Combines the source Observable with other Observables to create an Observable
 * whose values are calculated from the latest values of each, only when the source emits.
 * All input Observables must emit at least one value before the output Observable will emit a value.
 *
 * Marble diagram:
 *
 * ```text
 * --a----b---------c----d-----|
 * ----1----2--3--4----|
 *         withLatestFrom
 * ------(b1)------(c4)--(d4)--|
 * ```
 *
 * @param {Observable} observables An array of Observables to be combined.
 * @return {Observable} An Observable that emits combined values.
 */
function withLatestFrom() {
    var _this = this;
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return core_1.Observable.create(function (observer) {
        var project = null;
        // last argument is a project function?
        if (typeof observables[observables.length - 1] === 'function') {
            project = observables.pop();
        }
        var subscriptions = [];
        var values = [];
        var active = 0;
        // prepend calling observable
        observables.unshift(_this);
        // subscribe to all input observables
        observables.forEach(function (observable, idx) {
            var subscription = observable.subscribe({
                next: function (x) {
                    if (values[idx] == undefined) {
                        active++;
                    }
                    values[idx] = x;
                    // start emitting only when all sources emitted at least one value
                    // and the source (first observable) emits a value.
                    if (active === observables.length && idx === 0) {
                        try {
                            var output = values;
                            if (project) {
                                output = project.apply(void 0, values);
                            }
                            observer.next(output);
                        }
                        catch (err) {
                            observer.error(err);
                        }
                    }
                },
                error: function (err) { return observer.error(err); },
                complete: function () {
                    // complete when first Observable has completed
                    if (idx === 0) {
                        observer.complete();
                    }
                }
            });
            subscriptions.push(subscription);
        });
        return function () {
            subscriptions.filter(function (s) { return !s.isUnsubscribed; }).forEach(function (s) { return s.unsubscribe(); });
            subscriptions = null;
        };
    });
}
exports.withLatestFrom = withLatestFrom;
core_1.Observable.prototype.withLatestFrom = withLatestFrom;
//# sourceMappingURL=withLatestFrom.js.map