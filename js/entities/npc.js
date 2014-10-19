/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Utils = require('utils'),
        shipEntity = require('entities/ship'),
        world = require('entities/world');

    return function (type, pos, direction) {

        var npc = new shipEntity('npcs', type, pos, direction);

        npc.sightDistance = 200;
        npc.closestEnemy = null,
        npc.closestDistance = {
            mag: 9999999999,
            dir: 0
        };

        // inheritance workaround
        npc.updateShip = npc.update;

        npc.update = function () {

            npc.checkAi();
            npc.updateShip();
        };

        npc.checkAi = function () {

            // naively check for closest opponent
            npc.closestEnemy = null,
            npc.closestDistance = {
                mag: 9999999999,
                dir: 0
            };
//console.log(world.entities.npcs);
            Object.keys(world.entities.npcs).forEach(function (key) {

                if (key !== npc.subtype) {

                    world.entities.npcs[key].forEach(function (entity) {

                        var distance = npc.getDistance(entity);
                        //console.log(npc.closestDistance.mag, distance.mag);
                        if (npc.closestDistance.mag > distance.mag) {
                            //console.log('c');
                            npc.closestEnemy = entity;
                            npc.closestDistance = distance;
                        }

                    });
                }

            });
//console.log(npc.closestEnemy, npc.closestDistance);
            // move and fire toward them
            var vector = Utils.polarToCart(1, npc.closestDistance.dir);
            npc.updateMove(vector.x, vector.y);
            if (npc.closestDistance.mag < npc.sightDistance) {//} || Math.abs(npc.closestDistance.dir - npc.velocity.dir) > 0.05) {
                npc.updateWeapon(vector.x, vector.y);
            }
        };

        npc.getDistance = function (ship) {

            var diff = {
                x: ship.sprite.getOption('x') - npc.sprite.getOption('x'),
                y: ship.sprite.getOption('y') - npc.sprite.getOption('y')
            };

            return Utils.cartToPolar(diff.x, diff.y);
        };

        return npc;

    }

});
