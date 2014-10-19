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

        var level = {};

        $.get(uri).done(function (levelData) {

            world.entities.players.push(new playerEntity('team', { x: world.stage.width() / 2, y: world.stage.height() / 2}));

            Object.keys(levelData.npcs).forEach(function (key) {

                for (var i = 0, length = levelData.npcs[key].maxCount; i < length; i++) {

                    world.entities.factions[key].push(new npcEntity(key, {
                        x: Math.random() * world.stage.width(),
                        y: Math.random() * world.stage.height()
                    }));

                }

            });

        });

        return level;

    }

});
