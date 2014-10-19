/*jslint browser: true */

define(function (require) {

    'use strict';

    var $ = require('jquery');

    return {

        stage: null,

        followEntity: function (entity) {

            var pos = $('body').css('background-position').match(/[0-9]+/);

            $('body').css({ 'background-position': -entity.sprite.getOption('x') + 'px ' + -entity.sprite.getOption('y') + 'px' });

        },

        isVisible: function (entity) {

            var pos = entity.sprite.getAllMetrics();

            return !(pos.x < 0 || pos.x > this.stage.width() || pos.y < 0 || pos.y > this.stage.height());

        }

    };

});
