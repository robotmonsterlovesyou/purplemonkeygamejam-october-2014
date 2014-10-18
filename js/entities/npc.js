/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        world = require('entities/world'),
        bulletEntity = require('entities/bullet'),
        controls = new Gamepad();

    return function (type, pos, direction) {

        if (!pos) {

            pos = { x: 0, y: 0 };

        }

        var npc = new Facade.Rect({
            x: pos.x,
            y: pos.y,
            width: 10,
            height: 10,
            fillStyle: 'green'
        });

        require('facadejs-SATjs-plugin');

        npc.SAT('setVector');

        function detectHit () {

            var hit = false;

            world.entities.bullets.player.forEach(function (bullet) {

                if (npc.SAT('testCollision', bullet.SAT('getVector'))) {

                    hit = true;

                }

            });

            return hit;

        }

        function update () {

            var pos,
                speed = 1;

            if (direction[0] > 0) {

                npc.setOptions({ x: '+=' + speed });

            } else if (direction[0] < 0) {

                npc.setOptions({ x: '-=' + speed });

            }

            if (direction[1] > 0) {

                npc.setOptions({ y: '+=' + speed });

            } else if (direction[1] < 0) {

                npc.setOptions({ y: '-=' + speed });

            }

            pos = npc.getAllOptions();

            if (pos.x < 0 || pos.x > world.stage.width() || pos.y < 0 || pos.y > world.stage.height() || detectHit()) {

                world.entities.npcs[type].splice(world.entities.npcs[type].indexOf(npc), 1);

            } else {

                requestAnimationFrame(update);

            }

        }

        requestAnimationFrame(update);

        return npc;

    }

});
