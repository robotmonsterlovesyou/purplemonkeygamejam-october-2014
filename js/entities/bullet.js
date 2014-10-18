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

                var pos,
                    speed = 5;

                if (direction[0] > 0) {

                    bullet.sprite.setOptions({ x: '+=' + speed });

                } else if (direction[0] < 0) {

                    bullet.sprite.setOptions({ x: '-=' + speed });

                }

                if (direction[1] > 0) {

                    bullet.sprite.setOptions({ y: '+=' + speed });

                } else if (direction[1] < 0) {

                    bullet.sprite.setOptions({ y: '-=' + speed });

                }

                pos = bullet.sprite.getAllOptions();

                if (pos.x < 0 || pos.x > world.stage.width() || pos.y < 0 || pos.y > world.stage.height()) {

                    bullet.destory();

                }

            }
        };

        require('facadejs-SATjs-plugin');

        bullet.sprite.SAT('setVector');

        return bullet;

    }

});
