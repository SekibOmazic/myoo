"use strict";
var Observable_1 = require('../Observable');
var concat_1 = require('./concat');
function startWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i - 0] = arguments[_i];
    }
    var starter = Observable_1.Observable.fromArray(values);
    return concat_1.concat.call(starter, this);
}
exports.startWith = startWith;
Observable_1.Observable.prototype.startWith = startWith;
//# sourceMappingURL=startWith.js.map