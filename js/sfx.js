/*jslint browser: true */

define(function (require) {

    'use strict';

    function SFX (uri) {

        this.audio = new Audio();
        this.audio.src = uri;

    }

    SFX.prototype.play = function () {

        this.audio.play();

        return this;

    }

    SFX.prototype.volume = function (volume) {

        this.audio.volume = parseFloat(volume);

        return this;

    }

    return SFX;

});
