/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        camera = require('entities/camera'),
        entityEntity = require('entities/entity');

    require('facadejs-SATjs-plugin');

    return function (faction, pos, direction) {

        var npc = new entityEntity('factions', faction);

        npc.setSprite(new Facade.Rect({
            x: pos.x,
            y: pos.y,
            width: 10,
            height: 10,
            fillStyle: 'green'
        }));

        npc.update = function () {

            var pos = this.sprite.getAllOptions(),
                speed = 1;

            if (direction[0] > 0) {

                pos.x += speed;

            } else if (direction[0] < 0) {

                pos.x -= speed;

            }

            if (direction[1] > 0) {

                pos.y += speed;

            } else if (direction[1] < 0) {

                pos.y -= speed;

            }

            if (!camera.isVisible(npc)) {

                this.destroy();

            } else {

                npc.sprite.setOptions({ x: pos.x, y: pos.y });

                npc.sprite.SAT('setVector');

            }

        }

        if (faction === 'team') {

            npc.sprite.setOptions({ fillStyle: 'purple' });

        }

        return npc;

    }

});
