/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        controls = new Gamepad(),
        entities = {
            players: [],
            factions: {
                team: [],
                enemies: []
            },
            bullets: {
                player: [],
                team: [],
                enemies: []
            }
        };

    return {
        stage: null,
        entities: entities
    };

});
