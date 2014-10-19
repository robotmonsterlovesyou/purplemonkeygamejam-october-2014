/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Utils = require('utils'),
        sfx = require('sfx'),
        camera = require('entities/camera'),
        entityEntity = require('entities/entity'),
        particleEntity = require('entities/particle'),
        collectibleEntity = require('entities/collectible');

    require('facadejs-SATjs-plugin');

    return function (faction, pos, direction) {

        var ship = new entityEntity('factions', faction);

        ship.velocity = {
            mag: Math.floor(Math.random() * 2) === 1 ? 1 : -1,
            dir: Math.random() * 2 * Math.PI
        };

        ship.setSprite(new Facade.Polygon({
            points: [[0,0], [24, 12], [0, 24]],
            fillStyle: 'hsla(106, 100%, 50%, 0.65)',
            lineWidth: 2,
            strokeStyle: 'hsl(106, 100%, 50%)',
            anchor: 'center',
            x: pos.x,
            y: pos.y,
            rotate: ship.velocity.dir * 180 / Math.PI
        }));

        if (faction === 'team') {

            ship.sprite.setOptions({
                fillStyle: 'hsla(293, 100%, 50%, 0.65)',
                strokeStyle: 'hsl(293, 100%, 50%)'
            });

        }

        ship.detectHit = function () {

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

        ship.destroy = function () {

            new sfx('sfx/explosion.ogg').volume(.8).play();

            world.entities.particles.push(new particleEntity(this.sprite.getAllOptions()));
            world.entities.collectibles[faction].push(new collectibleEntity(faction, this.sprite.getAllOptions()));

            this.__proto__.destroy.call(this);

        }

        ship.update = function () {

            var move = Utils.polarToCart(this.velocity.mag, this.velocity.dir),
                newPos = {
                    x: this.sprite.getOption('x') + move.x,
                    y: this.sprite.getOption('y') + move.y
                };

            if (!camera.isVisible(ship) || this.detectHit()) {

                this.destroy();

            } else {

                this.sprite.setOptions({
                    x: newPos.x,
                    y: newPos.y
                });

                ship.sprite.SAT('setVector');

            }

        };

        return ship;

    }

});
