/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        world = require('entities/world'),
        controls = new Gamepad();

    return function (faction, pos, direction) {

        if (!pos) {

            pos = { x: 0, y: 0 };

        }

        var bullet;

        function detectHit () {

            var hit = false,
                bulletVector = bullet.sprite.SAT('getVector');

            world.entities.factions.enemies.forEach(function (npc) {

                if (npc.sprite.SAT('testCollision', bulletVector)) {

                    hit = true;

                    npc.destory();

                }

            });

            return hit;

        }

        bullet = {
            sprite: new Facade.Rect({
                x: pos.x,
                y: pos.y,
                width: 5,
                height: 5,
                fillStyle: 'blue'
            }),
            velocity: 0,
            direction: 0,
            destory: function () {

                world.entities.bullets[faction].splice(world.entities.bullets[faction].indexOf(bullet), 1);

            },
            update: function () {

                var pos = bullet.sprite.getAllOptions(),
                    speed = 5;

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

                if (pos.x < 0 || pos.x > world.stage.width() || pos.y < 0 || pos.y > world.stage.height() || detectHit()) {

                    bullet.destory();

                } else {

                    bullet.sprite.setOptions({ x: pos.x, y: pos.y });

                    bullet.sprite.SAT('setVector');

                }

            }
        };

        require('facadejs-SATjs-plugin');

        bullet.sprite.SAT('setVector');

        return bullet;

    }

});
