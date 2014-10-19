/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Utils = require('utils'),
        sfx = require('sfx'),
        camera = require('entities/camera'),
        entityEntity = require('entities/entity'),
        particleEntity = require('entities/particle');

    require('facadejs-SATjs-plugin');

    return function (faction, pos, direction) {

        var npc = new entityEntity('factions', faction);

        npc.velocity = {
            mag: Math.floor(Math.random() * 2) === 1 ? 1 : -1,
            dir: Math.random() * 2 * Math.PI
        };

        npc.setSprite(new Facade.Polygon({
            points: [[0,0], [24, 12], [0, 24]],
            fillStyle: 'hsla(106, 100%, 50%, 0.65)',
            lineWidth: 2,
            strokeStyle: 'hsl(106, 100%, 50%)',
            anchor: 'center',
            x: pos.x,
            y: pos.y,
            rotate: npc.velocity.dir * 180 / Math.PI
        }));

        npc.detectHit = function () {

            var hit = false,
                npcVector = this.sprite.SAT('getVector');

            Object.keys(world.entities.factions).forEach(function (key) {

                if (key !== faction) {

                    world.entities.factions[key].forEach(function (enemyNpc) {

                        if (enemyNpc.sprite.SAT('testCollision', npcVector)) {

                            hit = true;

                            enemyNpc.destroy();

                        }

                    });

                }

            });

            return hit;

        };

        npc.destroy = function () {

            new sfx('sfx/explosion.ogg').volume(.8).play();

            world.entities.particles.push(new particleEntity(this.sprite.getAllOptions()));

            this.__proto__.destroy.call(this);

        }

        npc.update = function () {

            var move = Utils.polarToCart(this.velocity.mag, this.velocity.dir),
                newPos = {
                    x: this.sprite.getOption('x') + move.x,
                    y: this.sprite.getOption('y') + move.y
                };

            if (!camera.isVisible(npc) || this.detectHit()) {

                this.destroy();

            } else {

                this.sprite.setOptions({
                    x: newPos.x,
                    y: newPos.y
                });

                npc.sprite.SAT('setVector');

            }

        };

        if (faction === 'team') {

            npc.sprite.setOptions({
                fillStyle: 'hsla(293, 100%, 50%, 0.65)',
                strokeStyle: 'hsl(293, 100%, 50%)'
            });

        }

        return npc;

    }

});
