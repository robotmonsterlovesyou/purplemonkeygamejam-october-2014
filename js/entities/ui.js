/*jslint browser: true */
/*globals Facade, Gamepad, $ */

define(function (require) {

    'use strict';

    var Facade = require('facade'),
        world = require('entities/world'),
        cache = {
            lives: new Facade.Text('Lives: 5', { x: 5, y: 5, fontSize: 30, fillStyle: '#fff' }),
            score: new Facade.Text('Score: 0', { x: 5, y: 45, fontSize: 30, fillStyle: '#fff' })
        },
        stats = {
            lives: 5,
            score: 0
        };

    return {

        stats: stats,

        render: function () {

            this.update();

            world.stage.addToStage(cache.lives);
            world.stage.addToStage(cache.score);

        },

        update: function () {

            cache.lives.setText(cache.lives.value.replace(/[\-0-9]+/, stats.lives));
            cache.score.setText(cache.score.value.replace(/[\-0-9]+/, ++stats.score));

        }

    };

});
