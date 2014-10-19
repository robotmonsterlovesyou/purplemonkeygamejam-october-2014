/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Utils = require('utils'),
        world = require('entities/world'),
        camera = require('entities/camera'),
        entity = function () {

            this.sprite = new Facade.Rect({
                width: 10,
                height: 10,
                fillStyle: 'red'
            });

            this.velocity = {
                mag: 0,
                dir: 0
            };

            this.sprite.SAT('setVector');

            this._container;

        };

    entity.prototype.destroy = function () {

        this._container.splice(this._container.indexOf(this), 1);

    };

    entity.prototype.setSprite = function (sprite) {

        this.sprite = sprite;

        this.sprite.SAT('setVector');

    };

    entity.prototype.update = function () {

        if (!camera.isVisible(this)) {

            this.destroy();

        } else {

            var move = Utils.polarToCart(this.velocity.mag, this.velocity.dir),
                newPos = {
                    x: this.sprite.getOption('x') + move.x,
                    y: this.sprite.getOption('y') + move.y
                };

            this.sprite.setOptions({
                x: newPos.x,
                y: newPos.y,
            });

            this.sprite.SAT('setVector');

        }

    };

    return function (type, subtype) {

        var temp = new entity();

        if (Object.keys(world.entities[type]).indexOf(subtype) !== -1) {

            temp._container = world.entities[type][subtype];

        } else {

            temp._container = world.entities[type];

        }

        return temp;

    }

});
