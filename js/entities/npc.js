/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Utils = require('utils'),
        shipEntity = require('entities/ship'),
        world = require('entities/world');

    return function (faction, pos, direction) {

        var npc = new shipEntity('npcs', faction, pos, direction);

        npc.sightDistance = 300;
        npc.closestEnemy = null,
        npc.closestDistance = {
            mag: 9999999999,
            dir: 0
        };

        // inheritance workaround
        npc.updateShip = npc.update;

        npc.update = function () {

            //npc.checkAi();
            npc.updateShip();
        };

        npc.checkAi = function () {

            // naively check for closest opponent
            npc.closestEnemy = null,
            npc.closestDistance = {
                mag: 9999999999,
                dir: 0
            };

            Object.keys(world.entities.npcs).forEach(function (key) {

                world.entities.npcs[key].forEach(function (entity) {

                    if (entity !== npc && entity.faction !== npc.faction) {
                        var distance = npc.getDistance(entity);
                        //console.log(closestDistance.mag, distance.mag);
                        if (npc.closestDistance.mag > distance.mag) {
                            //console.log('c');
                            npc.closestEnemy = entity;
                            npc.closestDistance = distance;
                        }
                    }

                });

            });
//console.log(closestEnemy, closestDistance);
            // move and fire toward them
            var vector = Utils.cartToPolar(1, npc.closestDistance.dir);
            npc.updateMove(vector.x, vector.y);
            if (npc.closestDistance.mag < npc.sightDistance || Math.abs(npc.closestDistance.dir - npc.velocity.dir) > 0.01) {
                npc.updateWeapon(vector.x, vector.y);
            }
        };

        npc.getDistance = function (ship) {

            var diff = {
                x: npc.sprite.getOption('x') - ship.sprite.getOption('x'),
                y: npc.sprite.getOption('y') - ship.sprite.getOption('y')
            };

            return Utils.cartToPolar(diff.x, diff.y);
        };

        return npc;

    }

});
