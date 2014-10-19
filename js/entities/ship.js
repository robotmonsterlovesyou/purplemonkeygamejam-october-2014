/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Utils = require('utils'),
        sfx = require('sfx'),
        camera = require('entities/camera'),
        entityEntity = require('entities/entity'),
        bulletEntity = require('entities/bullet'),
        particleEntity = require('entities/particle'),
        collectibleEntity = require('entities/collectible');

    require('facadejs-SATjs-plugin');

    return function (type, faction, pos, direction) {

        var ship = new entityEntity(type, faction);

        ship.velocity = {
            mag: Math.random() * 2,
            dir: Math.random() * 2 * Math.PI
        };
        ship.speed = 5;
        ship.thrust = 0.2;
        ship.weapon = {
            dir: ship.velocity.dir,
            torque: 0.3,
            cooldown: 0
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

            if (!camera.isVisible(ship) || this.detectHit()) {

                this.destroy();

            } else {

                this.__proto__.update.call(this);
                this.sprite.setOptions({
                    rotate: this.weapon.dir * 180 / Math.PI
                });

                ship.sprite.SAT('setVector');

            }

        };

    ship.updateMove = function (inputMag, inputDir, stickThreshold) {

        var stickVelP,
            stickVelC,
            entityVelC,
            finalVelP;

        stickVelP = Utils.cartToPolar(inputMag, inputDir);
        if (stickThreshold === undefined) stickThreshold = 0;

        if (stickVelP.radius > stickThreshold) {
            // apply thrust multiplier, then convert back to cartesian for vector addition
            stickVelP.radius *= this.thrust;
            stickVelC = Utils.polarToCart(stickVelP.radius, stickVelP.angle);
            entityVelC = Utils.polarToCart(this.velocity.mag, this.velocity.dir);
            // then store final velocity in polar
            finalVelP = Utils.cartToPolar(stickVelC.x + entityVelC.x, stickVelC.y + entityVelC.y);
            this.velocity.mag = finalVelP.radius;
            this.velocity.dir = finalVelP.angle;
        }
        if (this.velocity.mag > this.speed){
            this.velocity.mag = this.speed
        }

    };

    ship.updateWeapon = function (inputMag, inputDir, stickThreshold) {

        var pos = this.sprite.getAllOptions(),
            stickVel = Utils.cartToPolar(inputMag, inputDir),
            diff = this.weapon.dir - stickVel.angle;

        if (stickThreshold === undefined) stickThreshold = 0;
        if (diff > Math.PI) {
            diff -= Math.PI * 2;
        }
        if (diff < -Math.PI) {
            diff += Math.PI * 2;
        }
        // weapon movement is limited by torque ability
        if (stickVel.radius > stickThreshold) {
            if (Math.abs(diff) < this.weapon.torque) {
                this.weapon.dir = stickVel.angle;
            } else if (diff < 0) {
                this.weapon.dir += this.weapon.torque;
            } else {
                this.weapon.dir -= this.weapon.torque;
            }
        }
        if (this.weapon.cooldown > 0) {
            this.weapon.cooldown -= .1;
        } else if (stickVel.radius > stickThreshold) {
            this.weapon.cooldown = .1;
            world.entities.bullets.team.push(new bulletEntity('team', { x: pos.x, y: pos.y }, this.weapon.dir, this.velocity, 1500));
        }

    };

        return ship;

    }

});
