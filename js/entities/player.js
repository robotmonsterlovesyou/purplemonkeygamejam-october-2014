/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        world = require('entities/world'),
        bulletEntity = require('entities/bullet'),
        controls = new Gamepad();

    return function (faction, pos) {

        if (!pos) {

            pos = { x: 0, y: 0 };

        }

        var player = {
            sprite: new Facade.Rect({
                x: pos.x,
                y: pos.y,
                width: 15,
                height: 15,
                fillStyle: 'red'
            }),
            velocity: 0,
            direction: 0,
            weaponCooldown: 0,
            destory: function () {

                world.entities.players.splice(world.entities.players.indexOf(bullet), 1);

            },
            update: function () {



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

            if (e.value[0] < -0.5) {

                controls.trigger('hold', 'd_pad_left');

            } else if (e.value[0] > 0.5) {

                controls.trigger('hold', 'd_pad_right');

            }

            if (e.value[1] < -0.5) {

                controls.trigger('hold', 'd_pad_up');

            } else if (e.value[1] > 0.5) {

                controls.trigger('hold', 'd_pad_down');

            }

        });

        controls.on('hold', 'stick_axis_right', function (e) {

            var bullet,
                pos = player.sprite.getAllOptions();

            if (player.weaponCooldown > 0) {

                player.weaponCooldown -= .1;

                return false;

            }

            player.weaponCooldown = .5;

            if (e.value[0] < -0.5) {

                world.entities.bullets.team.push(new bulletEntity('team', { x: pos.x, y: pos.y }, e.value));

            } else if (e.value[0] > 0.5) {

                world.entities.bullets.team.push(new bulletEntity('team', { x: pos.x, y: pos.y }, e.value));

            }

            if (e.value[1] < -0.5) {

                world.entities.bullets.team.push(new bulletEntity('team', { x: pos.x, y: pos.y }, e.value));

            } else if (e.value[1] > 0.5) {

                world.entities.bullets.team.push(new bulletEntity('team', { x: pos.x, y: pos.y }, e.value));

            }

        });

        return player;

    }

});
