/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        Utils = require('utils'),
        sfx = require('sfx'),
        world = require('entities/world'),
        camera = require('entities/camera'),
        controls = new Gamepad();

    return function (faction, pos, direction, shipVel) {

        if (!pos) {

            pos = { x: 0, y: 0 };

        }

        var bullet,
            shipVelC = Utils.polarToCart(shipVel.mag, shipVel.dir),
            bulletVelC = Utils.polarToCart(7, direction),
            bulletVelP = Utils.cartToPolar(shipVelC.x + bulletVelC.x, shipVelC.y + bulletVelC.y),
            bulletSFX = new sfx('sfx/laser.ogg').volume(.5);

        function detectHit () {

            var hit = false,
                bulletVector = bullet.sprite.SAT('getVector');

            world.entities.factions.enemies.forEach(function (npc) {

                if (npc.sprite.SAT('testCollision', bulletVector)) {

                    hit = true;

                    npc.destroy();

                }

            });

            return hit;

        }

        bullet = {
            sprite: new Facade.Polygon({
                points: [[0,3],[6,0],[0,-3],[-6,0]],
                x: pos.x,
                y: pos.y,
                lineJoin: 'round',
                anchor: 'top',
                rotate: direction * 180 / Math.PI,
                fillStyle: '#faa'
            }),
            velocity: {
                mag: bulletVelP.radius,
                dir: bulletVelP.angle,
            },
            destroy: function () {

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

                if (!camera.isVisible(bullet) || detectHit()) {

                    bullet.destroy();

                } else {

                    bullet.sprite.SAT('setVector');

                }

            }
        };

        require('facadejs-SATjs-plugin');

        bullet.sprite.SAT('setVector');

        bulletSFX.play();

        return bullet;

    }

});
