/*jslint browser: true */

define(function (require) {

    'use strict';

    var Utils = {

        getFunctionFromString: function (string) {
            var scope = window,
                scopeSplit = string.split('.'),
                i;

            for (i = 0; i < scopeSplit.length - 1; i += 1) {
                scope = scope[scopeSplit[i]];
                if (scope === undefined) { return undefined; }
            }
            return scope[scopeSplit[scopeSplit.length - 1]];
        },

        trunc: function (num) {

            return num | 0;
        },

        clamp: function (num, low, high) {

            if (num < low) { num = low; }
            if (num > high) { num = high; }
            return num;
        },

        wrap: function (num, low, high) {

            if (num < low) { num = high - ((high - num) % (high - low)); }
            if (num > high) { num = low + ((num - low) % (high - low)); }
            return num;
        },

        isOdd: function (num) {

            return num % 2 === 1;
        },

        loadJSON: function (file, async) {

            var xobj = new xMLHttpRequest(),
                json;
            xobj.overrideMimeType("application/json");
            xobj.open('GET', file, async);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    json = JSON.parse(xobj.responseText);
                }
            }
            xobj.send(null);
            return json;
        },

        cartToPolar: function (x, y) {

            var mag = Math.sqrt(x * x + y * y),
                dir = x === 0 ? Math.PI / 2 * (y / Math.abs(y)) : Math.atan(y / x);
            if (x < 0) {
                dir += Math.PI;
            } else if(y < 0) {
                dir += Math.PI * 2;
            }
            return { mag: mag, dir: dir };
        },

        polarToCart: function (mag, dir) {

            return { x: mag * Math.cos(dir), y: mag * Math.sin(dir) };
        },

        // performance.now() shim --------------------------------------------------

        performanceNow: function () {

            if (!window.performance.now) {
                var nowOffset = Date.now();
                window.performance.now = function now() {
                    return Date.now() - nowOffset;
                };
            } else {
                return window.performance.now();
            }
        }
    };

    return Utils;

});
