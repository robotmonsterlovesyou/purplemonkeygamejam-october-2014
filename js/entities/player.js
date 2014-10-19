/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Utils = require('utils'),
        sfx = require('sfx'),
        Gamepad = require('gamepadjs'),
        world = require('entities/world'),
        camera = require('entities/camera'),
        shipEntity = require('entities/ship'),
        controls = new Gamepad();

    require('facadejs-SATjs-plugin');

    return function (type, pos, direction, shipVel) {

        var player = new shipEntity('npcs', type, pos, direction, shipVel),
            stickThreshold = 0.3;

        player.setSprite(new Facade.Polygon({
            points: [[0,0], [24, 12], [0, 24]],
            fillStyle: 'hsla(293, 100%, 50%, 0.65)',
            lineWidth: 2,
            strokeStyle: 'hsl(255, 100%, 100%)',
            anchor: 'center',
            x: pos.x,
            y: pos.y
        }));

        player.velocity = {
            mag: 0,
            dir: 0
        };
        player.weapon.dir = Math.PI * 3 / 2;

        // inheritance workaround
        player.updateShip = player.update;

        player.update = function () {

            player.updateShip();
            camera.followEntity(this);

        };

        controls.setCustomMapping('keyboard', {

            'key_a': 65,
            'key_w': 87,
            'key_s': 83,
            'key_d': 68,
            'd_pad_left': 37,
            'd_pad_right': 39,
            'd_pad_up': 38,
            'd_pad_down': 40
        });

        controls.on('hold', 'key_a', function (e) {

            player.updateMove(-1, 0);

        });

        controls.on('hold', 'key_d', function (e) {

            player.updateMove(1, 0);

        });

        controls.on('hold', 'key_w', function (e) {

            player.updateMove(0, -1);

        });

        controls.on('hold', 'key_s', function (e) {

            player.updateMove(0, 1);

        });

        controls.on('hold', 'd_pad_left', function (e) {

            player.updateWeapon(-1, 0);

        });

        controls.on('hold', 'd_pad_right', function (e) {

            player.updateWeapon(1, 0);

        });

        controls.on('hold', 'd_pad_up', function (e) {

            player.updateWeapon(0, -1);

        });

        controls.on('hold', 'd_pad_down', function (e) {

            player.updateWeapon(0, 1);

        });

        controls.on('hold', 'stick_axis_left', function (e) {

            player.updateMove(e.value[0], e.value[1], stickThreshold);

        });

        controls.on('hold', 'stick_axis_right', function (e) {

            player.updateWeapon(e.value[0], e.value[1], stickThreshold);

        });

        return player;

    }

});
