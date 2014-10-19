/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var entities = {
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

            Object.keys(entities.bullets).forEach(function (faction) {

                entities.bullets[faction].forEach(function (entity) {

                    entity.update();

                });

            });

            Object.keys(entities.factions).forEach(function (faction) {

                entities.factions[faction].forEach(function (entity) {

                    entity.update();

                });

            });

            entities.players.forEach(function (entity) {

                entity.update();

            });

        },

        fetchAllEntities: function () {

            var array = [];

            entities.players.forEach(function (entity) {

                array.push(entity.sprite);

            });

            Object.keys(entities.factions).forEach(function (faction) {

                entities.factions[faction].forEach(function (entity) {

                    array.push(entity.sprite);

                });

            });

            Object.keys(entities.bullets).forEach(function (faction) {

                entities.bullets[faction].forEach(function (entity) {

                    array.push(entity.sprite);

                });

            });

            return array;

        }

    };

});
