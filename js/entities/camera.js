/*jslint browser: true */

define(function (require) {

    'use strict';

    return {

        stage: null,

        isVisible: function (entity) {

            var pos = entity.sprite.getAllMetrics();

            return !(pos.x < 0 || pos.x > this.stage.width() || pos.y < 0 || pos.y > this.stage.height());

        }

    };

});
