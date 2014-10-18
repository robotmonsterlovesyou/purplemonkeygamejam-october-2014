/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        world = require('entities/world'),
        bulletEntity = require('entities/bullet'),
        controls = new Gamepad();

    return function (pos) {

        if (!pos) {

            pos = { x: 0, y: 0 };

        }

        var player = new Facade.Rect({
            x: pos.x,
            y: pos.y,
            width: 10,
            height: 10,
            fillStyle: 'red'
        });

        require('facadejs-SATjs-plugin');

        player.SAT('setVector');

        controls.on('hold', 'd_pad_left', function () {

            player.setOptions({ x: '-=5' });

        });

        controls.on('hold', 'd_pad_right', function () {

            player.setOptions({ x: '+=5' });

        });

        controls.on('hold', 'd_pad_up', function () {

            player.setOptions({ y: '-=5' });

        });

        controls.on('hold', 'd_pad_down', function () {

            player.setOptions({ y: '+=5' });

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
                pos = player.getAllOptions();

            if (e.value[0] < -0.5) {

                world.entities.push(new bulletEntity({ x: pos.x, y: pos.y }, e.value));

            } else if (e.value[0] > 0.5) {

                world.entities.push(new bulletEntity({ x: pos.x, y: pos.y }, e.value));

            }

            if (e.value[1] < -0.5) {

                world.entities.push(new bulletEntity({ x: pos.x, y: pos.y }, e.value));

            } else if (e.value[1] > 0.5) {

                world.entities.push(new bulletEntity({ x: pos.x, y: pos.y }, e.value));

            }

        });

        return player;

    }

});
