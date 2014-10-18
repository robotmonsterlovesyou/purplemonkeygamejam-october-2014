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
                team: [],
                enemies: []
            }
        };

    return {
        stage: null,
        entities: entities,
        update: function () {

            var array = [];

            Object.keys(world.entities.bullets).forEach(function (faction) {

                world.entities.bullets[faction].forEach(function (entity) {

                    entity.update();

                });

            });

            Object.keys(world.entities.factions).forEach(function (faction) {

                world.entities.factions[faction].forEach(function (entity) {

                    entity.update();

                });

            });

            world.entities.players.forEach(function (entity) {

                entity.update();

            });

        },
        fetchAllEntities: function () {

            var array = [];

            world.entities.players.forEach(function (entity) {

                array.push(entity.sprite);

            });

            Object.keys(world.entities.factions).forEach(function (faction) {

                world.entities.factions[faction].forEach(function (entity) {

                    array.push(entity.sprite);

                });

            });

            Object.keys(world.entities.bullets).forEach(function (faction) {

                world.entities.bullets[faction].forEach(function (entity) {

                    array.push(entity.sprite);

                });

            });

            return array;

        }
    };

});
