/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        Gamepad = require('gamepadjs'),
        world = require('entities/world'),
        controls = new Gamepad();

    return function (type, pos, direction) {

        if (!pos) {

            pos = { x: 0, y: 0 };

        }

        var bullet;

        bullet = new Facade.Rect({
            x: pos.x,
            y: pos.y,
            width: 5,
            height: 5,
            fillStyle: 'blue'
        });

        require('facadejs-SATjs-plugin');

        bullet.SAT('setVector');

        function update () {

            var pos,
                speed = 5;

            if (direction[0] > 0) {

                bullet.setOptions({ x: '+=' + speed });

            } else if (direction[0] < 0) {

                bullet.setOptions({ x: '-=' + speed });

            }

            if (direction[1] > 0) {

                bullet.setOptions({ y: '+=' + speed });

            } else if (direction[1] < 0) {

                bullet.setOptions({ y: '-=' + speed });

            }

            pos = bullet.getAllOptions();

            if (pos.x < 0 || pos.x > world.stage.width() || pos.y < 0 || pos.y > world.stage.height()) {

                world.entities.bullets[type].splice(world.entities.bullets[type].indexOf(bullet), 1);

            } else {

                requestAnimationFrame(update);

            }

        }

        requestAnimationFrame(update);

        return bullet;

    }

});
