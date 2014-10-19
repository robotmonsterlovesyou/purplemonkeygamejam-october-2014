/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Utils = require('utils'),
        sfx = require('sfx'),
        world = require('entities/world'),
        camera = require('entities/camera'),
        entityEntity = require('entities/entity');

    require('facadejs-SATjs-plugin');

    return function (faction, pos, direction, shipVel, expiration) {

        var bullet = new entityEntity('bullets', faction),
            shipVelC = Utils.polarToCart(shipVel.mag, shipVel.dir),
            bulletVelC = Utils.polarToCart(7, direction),
            bulletVelP = Utils.cartToPolar(shipVelC.x + bulletVelC.x, shipVelC.y + bulletVelC.y),
            bulletSFX = new sfx('sfx/laser.ogg').volume(.5);

        bullet.setSprite(new Facade.Polygon({
            points: [[0,3],[6,0],[0,-3],[-6,0]],
            x: pos.x,
            y: pos.y,
            lineJoin: 'round',
            anchor: 'top',
            rotate: direction * 180 / Math.PI,
            fillStyle: '#faa'
        }));

        bullet.velocity = {
            mag: bulletVelP.radius,
            dir: bulletVelP.angle,
        };

        bullet.expiration = Utils.performanceNow() + expiration;

        bullet.detectHit = function () {

            var hit = false,
                bulletVector = this.sprite.SAT('getVector');

            world.entities.factions.enemies.forEach(function (npc) {

                if (npc.sprite.SAT('testCollision', bulletVector)) {

                    hit = true;

                    npc.destroy();

                }

            });

            return hit;

        };

        bullet.update = function () {

            var move = Utils.polarToCart(this.velocity.mag, this.velocity.dir),
                newPos = {
                    x: this.sprite.getOption('x') + move.x,
                    y: this.sprite.getOption('y') + move.y
                };

            this.sprite.setOptions({
                x: newPos.x,
                y: newPos.y,
                rotate: this.velocity.dir * 180 / Math.PI
            });

            if ((this.expiration < Utils.performanceNow()) || this.detectHit()) {

                bullet.destroy();

            } else {

                bullet.sprite.SAT('setVector');

            }

        };

        bulletSFX.play();

        return bullet;

    }

});
