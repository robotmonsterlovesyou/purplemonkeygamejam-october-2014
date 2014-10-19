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

    return function (faction, pos) {

        var collectible = new entityEntity('collectibles', faction)

        collectible.setSprite(new Facade.Polygon({
            points: [[0,3],[6,0],[0,-3],[-6,0]],
            x: pos.x,
            y: pos.y,
            lineJoin: 'round',
            anchor: 'top',
            rotate: Math.random() * 360,
            fillStyle: '#fff'
        }));

        collectible.expiration = Utils.performanceNow() + expiration;

        collectible.update = function () {

            if (this.expiration < Utils.performanceNow()) {

                collectible.destroy();

            }

        };

        return collectible;

    }

});
