/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        world = require('entities/world'),
        entity = function () {

            this.sprite = new Facade.Rect({
                width: 10,
                height: 10,
                fillStyle: 'red'
            });

            this.sprite.SAT('setVector');

            this.velocity = 0;
            this.direction = 0;

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

        if (!camera.isVisible(bullet)) {

            this.destroy();

        } else {

            this.sprite.SAT('setVector');

        }

    };

    return function (type, subtype) {

        var temp = new entity();

        temp._container = world.entities[type][subtype];

        return temp;

    }

});
