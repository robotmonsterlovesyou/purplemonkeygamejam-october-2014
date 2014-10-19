/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        utils = require('utils'),
        stage = new Facade(document.querySelector('canvas')),
        world = require('entities/world'),
        camera = require('entities/camera'),
        playerEntity = require('entities/player'),
        npcEntity = require('entities/npc'),
        player1 = new playerEntity('team', { x: stage.width() / 2, y: stage.height() / 2});

    world.stage = stage;
    camera.stage = stage;

    world.entities.players.push(player1);

    for (var i = 0; i < 10; i++) {

        world.entities.factions.team.push(new npcEntity('team', {
            x: Math.random() * stage.width(),
            y: Math.random() * stage.height()
        }));

    }

    for (var i = 0; i < 10; i++) {

        world.entities.factions.enemies.push(new npcEntity('enemies', {
            x: Math.random() * stage.width(),
            y: Math.random() * stage.height()
        }));

    }

    // music stuff

    var audioContext = new AudioContext();
    var bgMusic;

    function fetchAudio (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function () {
            callback(xhr.response);
        };
        xhr.send();
    }
    function decodeAudio (arrayBuffer, callback) {
        audioContext.decodeAudioData(arrayBuffer, function(audioBuffer) {
            callback(audioBuffer)   ;
        });
    }

    function playAudio (audioBuffer, delay) {
        bgMusic = audioContext.createBufferSource();
        bgMusic.buffer = audioBuffer;
        bgMusic.loop = true;
        bgMusic.connect(audioContext.destination);
        bgMusic.start(audioContext.currentTime + delay);
    console.log(audioContext.currentTime);
    }

    function playBgMusic (bgFile, delay) {
        stopBgMusic(delay);
        var bgBuffer = fetchAudio(bgFile, function( arrayBuffer ) {
        decodeAudio(arrayBuffer, function( audioBuffer ) {
            playAudio(audioBuffer, delay);
        });
    });
    }

    function stopBgMusic (delay) {
        if (bgMusic !== undefined) {
            bgMusic.stop(audioContext.currentTime + delay);
        }
    }

    playBgMusic('sfx/bg1.ogg', 0);

    // end music stuff

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

                stage.stop(0);
                stopBgMusic(0);

            } else {

                stage.start(0);
                playBgMusic('sfx/bg1.ogg', 0);
            }

        }

    });

    window.world = world;

});
