/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        stage = new Facade(document.querySelector('canvas')),
        world = require('entities/world'),
        playerEntity = require('entities/player'),
        player1 = new playerEntity({ x: stage.width() / 2, y: stage.height() / 2});

    world.stage = stage;

    world.entities.push(player1);

    stage.draw(function () {

        this.clear();

        this.addToStage(world.entities);

    });

});
