/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        Utils = require('utils'),
        world = require('entities/world'),
        bulletEntity = require('entities/bullet'),
        controls = new Gamepad();

    return function (faction, pos) {

        if (!pos) {

            pos = { x: 0, y: 0 };

        }

        var stickThreshold = 0.3;

        var player = {
            sprite: new Facade.Polygon({
                points: [[0,0], [32, 16], [0, 32]],
                fillStyle: '',
                lineWidth: 2,
                strokeStyle: 'rgb(255, 255, 255)',
                anchor: 'center',
                x: pos.x,
                y: pos.y
            }),
            velocity: {
                mag: 0,
                dir: 0
            },
            faction: faction,
            speed: 5,         // move to faction code later
            thrust: 0.2,      // move to faction code later
            weapon: {
                dir: 0,
                torque: 0.3,    // move to faction code later
                cooldown: 0,
            },
            destroy: function () {

                world.entities.players.splice(world.entities.players.indexOf(player), 1);

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
                    rotate: this.weapon.dir * 180 / Math.PI
                });
            }
        };

        require('facadejs-SATjs-plugin');

        player.sprite.SAT('setVector');

        controls.on('hold', 'd_pad_left', function () {

            player.sprite.setOptions({ x: '-=5' });

        });

        controls.on('hold', 'd_pad_right', function () {

            player.sprite.setOptions({ x: '+=5' });

        });

        controls.on('hold', 'd_pad_up', function () {

            player.sprite.setOptions({ y: '-=5' });

        });

        controls.on('hold', 'd_pad_down', function () {

            player.sprite.setOptions({ y: '+=5' });

        });

        controls.on('hold', 'stick_axis_left', function (e) {

            var stickVelP,
                stickVelC,
                playerVelC,
                finalVelP;

            stickVelP = Utils.cartToPolar(e.value[0], e.value[1]);

            if (stickVelP.radius > stickThreshold) {
                // apply thrust multiplier, then convert back to cartesian for vector addition
                stickVelP.radius *= player.thrust;
                stickVelC = Utils.polarToCart(stickVelP.radius, stickVelP.angle);
                playerVelC = Utils.polarToCart(player.velocity.mag, player.velocity.dir);
                // then store final velocity in polar
                finalVelP = Utils.cartToPolar(stickVelC.x + playerVelC.x, stickVelC.y + playerVelC.y);
                player.velocity.mag = finalVelP.radius;
                player.velocity.dir = finalVelP.angle;
            }
            if (player.velocity.mag > player.speed){
                player.velocity.mag = player.speed
            }

        });

        controls.on('hold', 'stick_axis_right', function (e) {

            var pos = player.sprite.getAllOptions(),
                stickVel = Utils.cartToPolar(e.value[0], e.value[1]),
                diff = player.weapon.dir - stickVel.angle;

            if (diff > Math.PI) {
                diff -= Math.PI * 2;
            }
            if (diff < -Math.PI) {
                diff += Math.PI * 2;
            }
            // weapon movement is limited by torque ability
            if (stickVel.radius > stickThreshold) {
                if (Math.abs(diff) < player.weapon.torque) {
                    player.weapon.dir = stickVel.angle;
                } else if (diff < 0) {
                    player.weapon.dir += player.weapon.torque;
                } else {
                    player.weapon.dir -= player.weapon.torque;
                }
            }
            if (player.weapon.cooldown > 0) {
                player.weapon.cooldown -= .1;
            } else if (stickVel.radius > stickThreshold) {
                player.weapon.cooldown = .1;
                world.entities.bullets.team.push(new bulletEntity('team', { x: pos.x, y: pos.y }, player.weapon.dir, player.velocity));
            }

        });

        return player;

    }

});
