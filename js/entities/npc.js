/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        sfx = require('sfx'),
        world = require('entities/world'),
        camera = require('entities/camera'),
        bulletEntity = require('entities/bullet'),
        controls = new Gamepad();

    return function (faction, pos, direction) {

        if (!pos) {

            pos = { x: 0, y: 0 };

        }

        var npc,
            explosionSFX = new sfx('sfx/explosion.ogg').volume(.8);

        npc = {
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

                explosionSFX.play();

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

                if (!camera.isVisible(npc)) {

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
