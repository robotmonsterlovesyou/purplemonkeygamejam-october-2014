/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        Utils = require('utils'),
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
                anchor: 'center',
                rotate: direction * 180 / Math.PI,
                fillStyle: 'blue'
            }),
            velocity: {
                mag: 5,
                dir: direction,
            },
            destory: function () {

                world.entities.bullets[faction].splice(world.entities.bullets[faction].indexOf(bullet), 1);

            },
            update: function () {

                var move = Utils.polarToCart(this.velocity.mag, this.velocity.dir),
                    newPos = {
                        x: this.sprite.getOption('x') + move.x,
                        y: this.sprite.getOption('y') + move.y
                    };

                this.sprite.setOptions({
                    x: newPos.x,
                    y: newPos.y,
                    rotate: this.velocity.dir * 180 / Math.PI
                });

                if (pos.x < 0 || pos.x > world.stage.width() || pos.y < 0 || pos.y > world.stage.height() || detectHit()) {

                    bullet.destory();

                } else {

                    bullet.sprite.SAT('setVector');

                }

            }
        };

        require('facadejs-SATjs-plugin');

        bullet.sprite.SAT('setVector');

        return bullet;

    }

});
