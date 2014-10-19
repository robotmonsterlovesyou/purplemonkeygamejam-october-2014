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

    return function (faction, pos, direction, shipVel) {

        var player = new shipEntity('players', faction, pos, direction, shipVel),
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

        controls.on('hold', 'stick_axis_left', function (e) {

            player.updateMove(e.value[0], e.value[1], stickThreshold);

        });

        controls.on('hold', 'stick_axis_right', function (e) {

            player.updateWeapon(e.value[0], e.value[1], stickThreshold);

        });

        return player;

    }

});
