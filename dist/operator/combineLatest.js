"use strict";
var Observable_1 = require('../Observable');
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 * It starts emitting values when all input observables emit first value and
 * stops when all input observables have stopped.
 *
 * Marble diagram:
 *
 * ```text
 * --1-------2----------------3-----|
 * -----a----------b-----c--|
 *         combineLatest
 * ----(1a)-(2a)--(2b)--(2c)-(3c)---|
 * ```
 *
 * @param {Observable} observables An array of Observables to be combined.
 * @return {Observable} An Observable that emits combined values.
 */
function combineLatest() {
    var _this = this;
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return Observable_1.Observable.create(function (observer) {
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
                    if (active === observables.length) {
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
                    // complete only when all sources have completed
                    if (subscriptions.filter(function (s) { return !s.isStopped; }).length === 0) {
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
exports.combineLatest = combineLatest;
//# sourceMappingURL=combineLatest.js.map