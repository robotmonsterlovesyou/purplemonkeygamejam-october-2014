/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Utils = require('utils'),

        particleGenerator = function (pos) {

            var r;

            this.particles = [];

            for (r = 0; r < 360; r = r + 15) {

                this.particles.push({
                    spread: 0,
                    r: r,
                    sprite: new Facade.Circle({
                        x: pos.x + Math.cos(r),
                        y: pos.y + Math.sin(r),
                        radius: 3,
                        fillStyle: '#f00',
                        opacity: 100
                    })
                });

            }

        };

    particleGenerator.prototype.destory = function () {

        world.entities.particles.splice(world.entities.particles.indexOf(this), 1);

    };

    particleGenerator.prototype.update = function () {

        var self = this;

        this.particles.forEach(function (particle) {

            var options = particle.sprite.getAllOptions();

            particle.spread += .05;
            options.opacity -= .5;

            if (options.opacity < 0) {

                self.destory();

            } else {

                particle.sprite.setOptions({
                    x: options.x + particle.spread * Math.cos(particle.r),
                    y: options.y + particle.spread * Math.sin(particle.r),
                    opacity: options.opacity
                });

            }

        });

    };

    return function (pos) {

        return new particleGenerator(pos);

    }

});
