"use strict";
var map_1 = require('./map');
function propertyPlucker(properties) {
    var mapperFn = function (x) {
        // start with the root object
        var current = x;
        // iterate over the properties
        properties.forEach(function (prop, idx) {
            if (current !== undefined) {
                var propFound = current[properties[idx]];
                if (typeof propFound !== 'undefined') {
                    current = propFound;
                }
                else {
                    current = undefined;
                }
            }
        });
        return current;
    };
    return mapperFn;
}
function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i - 0] = arguments[_i];
    }
    if (properties.length === 0) {
        throw new Error('List of properties is empty. Please provide some.');
    }
    return map_1.map.call(this, propertyPlucker(properties));
}
exports.pluck = pluck;
//# sourceMappingURL=pluck.js.map