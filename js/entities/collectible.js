/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Utils = require('utils'),
        sfx = require('sfx'),
        world = require('entities/world'),
        camera = require('entities/camera'),
        entityEntity = require('entities/entity'),
        expiration = 5000;

    require('facadejs-SATjs-plugin');

    return function (type, pos) {

        var collectible = new entityEntity('collectibles', type)

        collectible.setSprite(new Facade.Polygon({
            points: [[0,5],[5,0],[0,-5],[-5,0]],
            x: pos.x,
            y: pos.y,
            lineJoin: 'round',
            anchor: 'top',
            rotate: Math.random() * 360,
            fillStyle: world.activeState.data.npcs[type].sprite.strokeStyle,
            strokeStyle: world.activeState.data.npcs[type].sprite.fillStyle,
            lineWidth: 6
        }));

        collectible.expiration = Utils.performanceNow() + expiration;

        collectible.detectHit = function () {

            var hit = false,
                collectibleVector = this.sprite.SAT('getVector');

            world.activeState.players.forEach(function (player) {

                if (player.sprite.SAT('testCollision', collectibleVector)) {

                    hit = true;

                }

            });

            return hit;

        };

        collectible.update = function () {

            if (this.expiration < Utils.performanceNow() || this.detectHit()) {

                collectible.destroy();

            }

        };

        return collectible;

    }

});
