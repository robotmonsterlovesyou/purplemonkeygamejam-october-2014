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

    controls.on('hold', 'stick_axis_left', function (e) {

        var speed = 3;

        if (e.value[0] < 0) {

            player.setOptions({ x: '-=' + speed });

        } else if (e.value[0]) {

            player.setOptions({ x: '+=' + speed });

        }

        if (e.value[1] < 0) {

            player.setOptions({ y: '-=' + speed });

        } else if (e.value[1]) {

            player.setOptions({ y: '+=' + speed });

        }

    });

});
