/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Utils = require('utils'),
        camera = require('entities/camera'),
        entityEntity = require('entities/entity');

    require('facadejs-SATjs-plugin');

    return function (faction, pos, direction) {

        var npc = new entityEntity('factions', faction);

        npc.velocity = {
            mag: Math.floor(Math.random() * 2) === 1 ? 1 : -1,
            dir: Math.random() * 2 * Math.PI
        };

        npc.setSprite(new Facade.Polygon({
            points: [[0,0], [24, 12], [0, 24]],
            fillStyle: 'green',
            lineWidth: 2,
            strokeStyle: 'rgb(255, 255, 255)',
            anchor: 'center',
            x: pos.x,
            y: pos.y,
            rotate: npc.velocity.dir * 180 / Math.PI
        }));



        npc.update = function () {

            var move = Utils.polarToCart(this.velocity.mag, this.velocity.dir),
                newPos = {
                    x: this.sprite.getOption('x') + move.x,
                    y: this.sprite.getOption('y') + move.y
                };

            if (!camera.isVisible(npc)) {

                this.destroy();

            } else {

                this.sprite.setOptions({
                    x: newPos.x,
                    y: newPos.y
                });

                npc.sprite.SAT('setVector');

            }

        };

        if (faction === 'team') {

            npc.sprite.setOptions({ fillStyle: 'purple' });

        }

        return npc;

    }

});
