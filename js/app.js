/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        utils = require('utils'),
        music = require('music'),
        stage = new Facade(document.querySelector('canvas')),
        world = require('entities/world'),
        camera = require('entities/camera'),
        levelEntity = require('entities/level'),
        bgMusic = new music('sfx/bg-ambience.ogg'),
        level1;

    world.stage = stage;
    camera.stage = stage;

    level1 = new levelEntity('data/levels/level1.json');

    world.activeState = level1;

    stage.draw(function () {

        this.clear();

        world.update();

        this.addToStage(world.fetchAllEntities());

    });

    document.addEventListener('keydown', function (e) {

        if (e.metaKey) { return false; }

        e.preventDefault();

        if (e.keyCode === 32) {

            if (stage._requestAnimation) {

                stage.stop();

                bgMusic.stop();

            } else {

                stage.start();

                bgMusic.start();
            }

        }

    });

    window.world = world;

});
