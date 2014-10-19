/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Utils = require('utils'),

        particleGenerator = function (type, pos) {

            var r;

            this.particles = [];

            this.particles.push({
                sprite: new Facade.Circle({
                    x: pos.x,
                    y: pos.y,
                    radius: 10,
                    fillStyle: '',
                    strokeStyle: world.activeState.data.npcs[type].sprite.fillStyle,
                    lineWidth: 1,
                    anchor: 'center',
                    setLineDash: [[1, 2]]
                })
            });

        };

    particleGenerator.prototype.destory = function () {

        world.entities.particles.splice(world.entities.particles.indexOf(this), 1);

    };

    particleGenerator.prototype.update = function () {

        var self = this;

        this.particles.forEach(function (particle) {

            var options = particle.sprite.getAllOptions();

            options.scale += .2;
            options.radius += .05;
            options.opacity -= 2;

            if (options.opacity < 0) {

                self.destory();

            } else {

                particle.sprite.setOptions({
                    scale: options.scale,
                    radius: options.radius,
                    opacity: options.opacity
                });

            }

        });

    };

    return function (type, pos) {

        return new particleGenerator(type, pos);

    }

});
