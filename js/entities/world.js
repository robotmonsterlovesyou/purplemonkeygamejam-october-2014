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
            },
            particles: [],
            collectibles: {
                team: [],
                enemies: []
            }
        };

    return {

        stage: null,
        entities: entities,

        update: function () {

            var array = [];

            Object.keys(entities.collectibles).forEach(function (key) {

                entities.collectibles[key].forEach(function (entity) {

                    entity.update();

                });

            });

            Object.keys(entities.bullets).forEach(function (key) {

                entities.bullets[key].forEach(function (entity) {

                    entity.update();

                });

            });

            Object.keys(entities.factions).forEach(function (key) {

                entities.factions[key].forEach(function (entity) {

                    entity.update();

                });

            });

            entities.players.forEach(function (entity) {

                entity.update();

            });

            entities.particles.forEach(function (entity) {

                entity.update();

            });

            entities.particles.forEach(function (entity) {

                entity.update();

            });

        },

        fetchAllEntities: function () {

            var array = [];

            Object.keys(entities.collectibles).forEach(function (key) {

                entities.collectibles[key].forEach(function (entity) {

                    array.push(entity.sprite);

                });

            });

            Object.keys(entities.bullets).forEach(function (key) {

                entities.bullets[key].forEach(function (entity) {

                    array.push(entity.sprite);

                });

            });

            Object.keys(entities.factions).forEach(function (key) {

                entities.factions[key].forEach(function (entity) {

                    array.push(entity.sprite);

                });

            });

            entities.players.forEach(function (entity) {

                array.push(entity.sprite);

            });

            entities.particles.forEach(function (set) {

                set.particles.forEach(function (entity) {

                    array.push(entity.sprite);

                });

            });

            return array;

        }

    };

});
