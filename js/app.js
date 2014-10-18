/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        stage = new Facade(document.querySelector('canvas')),
        playerEntity = require('entities/player'),
        player1 = new playerEntity({ x: stage.width() / 2, y: stage.height() / 2});

    stage.draw(function () {

        this.clear();

        this.addToStage(player1);

    });

});
