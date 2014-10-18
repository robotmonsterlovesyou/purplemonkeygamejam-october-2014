/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        world = require('entities/world'),
        bulletEntity = require('entities/bullet'),
        controls = new Gamepad();

    return function (faction, pos, direction) {

        if (!pos) {

            pos = { x: 0, y: 0 };

        }

        var npc = {
            sprite: new Facade.Rect({
                x: pos.x,
                y: pos.y,
                width: 10,
                height: 10,
                fillStyle: 'green'
            }),
            velocity: 0,
            direction: 0,
            weaponCooldown: 0,
            destory: function () {

                world.entities.factions[faction].splice(world.entities.factions[faction].indexOf(npc), 1);

            },
            update: function () {

                var pos = npc.sprite.getAllOptions(),
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

                if (pos.x < 0 || pos.x > world.stage.width() || pos.y < 0 || pos.y > world.stage.height()) {

                    world.entities.factions[faction].splice(world.entities.factions[faction].indexOf(npc), 1);

                } else {

                    npc.sprite.setOptions({ x: pos.x, y: pos.y });

                    npc.sprite.SAT('setVector');

                }

            }
        };

        if (faction === 'team') {

            npc.sprite.setOptions({ fillStyle: 'purple' });

        }

        require('facadejs-SATjs-plugin');

        npc.sprite.SAT('setVector');

        return npc;

    }

});
