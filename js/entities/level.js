/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var $ = require('jquery'),
        Facade = require('facade'),
        Utils = require('utils'),
        world = require('entities/world'),
        camera = require('entities/camera'),
        playerEntity = require('entities/player'),
        npcEntity = require('entities/npc');

    require('facadejs-SATjs-plugin');

    return function (uri) {

        var level = {
            data: null,
            players: [],
            spawnPlayer: function (id) {

                level.players.push(new playerEntity('team', { x: world.stage.width() / 2, y: world.stage.height() / 2}, {

                }));

                world.entities.npcs.team.push(level.players[id]);

            }
        };

        $.get(uri).done(function (levelData) {

            level.data = levelData;

            Object.keys(levelData.npcs).forEach(function (key) {

                world.entities.npcs[key] = [];
                world.entities.bullets[key] = [];
                world.entities.collectibles[key] = [];

                for (var i = 0, length = levelData.npcs[key].maxCount; i < length; i++) {

                    world.entities.npcs[key].push(new npcEntity(key, {
                        x: Math.random() * world.stage.width(),
                        y: Math.random() * world.stage.height()
                    }));

                }

            });

            level.spawnPlayer(0);

        });

        return level;

    }

});
