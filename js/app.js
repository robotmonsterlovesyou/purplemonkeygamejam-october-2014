/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var $ = require('jquery'),
        Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        stage = new Facade(document.querySelector('canvas')),
        controls = new Gamepad(),
        world,
        player;

    require('facadejs-Box2D-plugin');

    world = new Facade.Entity().Box2D('createWorld', { canvas: stage.canvas, gravity: [ 0, 0 ] });

    player = new Facade.Rect({ x: stage.width() / 2, y: stage.height() / 2, width: 10, height: 10, fillStyle: 'red' });

    player.Box2D('createObject', world, {
        type: 'dynamic',
        friction: 3
    });

    stage.draw(function () {

        this.clear();

        this.addToStage(player);

        world.Box2D('step');

        world.Box2D('drawDebug');

    });

    controls.on('hold', 'stick_axis_left', function (e) {

        if (e.value[0] < 0) {

            player.Box2D('setVelocity', -5, null);

        } else if (e.value[0]) {

            player.Box2D('setVelocity', 5, null);

        }

        if (e.value[1] < 0) {

            player.Box2D('setVelocity', null, -5);

        } else if (e.value[1]) {

            player.Box2D('setVelocity', null, 5);

        }

    });

    controls.on('release', 'stick_axis_left', function (e) {

        player.Box2D('setVelocity', 0, 0);

    })

});
