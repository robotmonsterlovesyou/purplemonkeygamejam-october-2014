/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var $ = require('jquery'),
        Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        stage = new Facade(document.querySelector('canvas')),
        controls = new Gamepad(),
        player;

    require('facadejs-SATjs-plugin');

    player = new Facade.Rect({ x: stage.width() / 2, y: stage.height() / 2, width: 10, height: 10, fillStyle: 'red' });

    player.SAT('setVector');

    stage.draw(function () {

        this.clear();

        this.addToStage(player);

    });

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

});
