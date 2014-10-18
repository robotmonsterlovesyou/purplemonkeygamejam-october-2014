/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        controls = new Gamepad(),
        entities = [];

    return {
        stage: null,
        entities: entities
    };

});
