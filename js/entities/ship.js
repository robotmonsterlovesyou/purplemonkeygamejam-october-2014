/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Utils = require('utils'),
        sfx = require('sfx'),
        world = require('entities/world'),
        camera = require('entities/camera'),
        entityEntity = require('entities/entity'),
        bulletEntity = require('entities/bullet'),
        particleEntity = require('entities/particle'),
        collectibleEntity = require('entities/collectible');

    require('facadejs-SATjs-plugin');

    return function (type, subtype, pos, direction) {

        var ship = new entityEntity(type, subtype);

        ship.subtype = subtype;

        ship.ability_base = world.activeState.data.npcs[subtype].ability_base;
        ship.velocity = {
            mag: Math.random() * 2,
            dir: Math.random() * 2 * Math.PI
        };
        ship.topSpeed = 0;
        ship.thrust = 0;
        ship.weapon = {
            dir: ship.velocity.dir,
            torque: 0,
            cooldown: 0,
            lastFired: 0
        };

        ship.setSprite(new Facade.Polygon({
            points: [[0,0], [24, 12], [0, 24]],
            fillStyle: world.activeState.data[type][subtype].sprite.fillStyle,
            lineWidth: 2,
            strokeStyle: world.activeState.data[type][subtype].sprite.strokeStyle,
            anchor: 'center',
            x: pos.x,
            y: pos.y,
            rotate: ship.velocity.dir * 180 / Math.PI
        }));

        ship.detectHit = function () {

            var hit = false,
                npcVector = this.sprite.SAT('getVector');

            Object.keys(world.entities.npcs).forEach(function (key) {

                if (key !== subtype) {

                    world.entities.npcs[key].forEach(function (enemyNpc) {

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
            world.entities.collectibles[subtype].push(new collectibleEntity(subtype, this.sprite.getAllOptions()));

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

            if (stickVelP.mag > stickThreshold) {
                // apply thrust multiplier, then convert back to cartesian for vector addition
                stickVelP.mag *= this.thrust + this.ability_base.thrust;
                stickVelC = Utils.polarToCart(stickVelP.mag, stickVelP.dir);
                entityVelC = Utils.polarToCart(this.velocity.mag, this.velocity.dir);
                // then store final velocity in polar
                finalVelP = Utils.cartToPolar(stickVelC.x + entityVelC.x, stickVelC.y + entityVelC.y);
                this.velocity.mag = finalVelP.mag;
                this.velocity.dir = finalVelP.dir;
            }
            if (this.velocity.mag > this.topSpeed + this.ability_base.topSpeed){
                this.velocity.mag = this.topSpeed + this.ability_base.topSpeed
            }

        };

        ship.updateWeapon = function (inputMag, inputDir, stickThreshold) {

            var pos = this.sprite.getAllOptions(),
                stickVel = Utils.cartToPolar(inputMag, inputDir),
                diff = this.weapon.dir - stickVel.dir;

            if (stickThreshold === undefined) stickThreshold = 0;
            if (diff > Math.PI) {
                diff -= Math.PI * 2;
            }
            if (diff < -Math.PI) {
                diff += Math.PI * 2;
            }
            // weapon movement is limited by torque ability
            if (stickVel.mag > stickThreshold) {
                if (Math.abs(diff) < this.weapon.torque + this.ability_base.weapon_torque) {
                    this.weapon.dir = stickVel.dir;
                } else if (diff < 0) {
                    this.weapon.dir += this.weapon.torque + this.ability_base.weapon_torque;
                } else {
                    this.weapon.dir -= this.weapon.torque + this.ability_base.weapon_torque;
                }
                if (this.weapon.lastFired + this.weapon.cooldown + this.ability_base.weapon_cooldown < Utils.performanceNow()) {
                    this.weapon.lastFired = Utils.performanceNow();
                    world.entities.bullets[this.subtype].push(new bulletEntity(this.subtype, { x: pos.x, y: pos.y }, this.weapon.dir, this.velocity, 1500));
                }
            }

        };

        return ship;

    }

});
