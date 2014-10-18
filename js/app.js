/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        stage = new Facade(document.querySelector('canvas')),
        world = require('entities/world'),
        playerEntity = require('entities/player'),
        npcEntity = require('entities/npc'),
        player1 = new playerEntity('team', { x: stage.width() / 2, y: stage.height() / 2});

    world.stage = stage;

    world.entities.players.push(player1);

    for (var i = 0; i < 10; i++) {

        world.entities.factions.team.push(new npcEntity('team', {
            x: Math.random() * stage.width(),
            y: Math.random() * stage.height()
        }, [
            Math.floor(Math.random() * 2) === 1 ? 1 : -1,
            Math.floor(Math.random() * 2) === 1 ? 1 : -1
        ]));

    }

    for (var i = 0; i < 10; i++) {

        world.entities.factions.enemies.push(new npcEntity('enemies', {
            x: Math.random() * stage.width(),
            y: Math.random() * stage.height()
        }, [
            Math.floor(Math.random() * 2) === 1 ? 1 : -1,
            Math.floor(Math.random() * 2) === 1 ? 1 : -1
        ]));

    }

    stage.draw(function () {

        this.clear();

        this.addToStage(world.entities.bullets.player);
        this.addToStage(world.entities.bullets.team);
        this.addToStage(world.entities.bullets.enemies);

        this.addToStage(world.entities.players);

        this.addToStage(world.entities.factions.team);
        this.addToStage(world.entities.factions.enemies);

    });

    window.world = world;

});
