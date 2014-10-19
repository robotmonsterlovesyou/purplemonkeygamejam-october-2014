/*jslint browser: true */

define(function (require) {

    'use strict';

    function SFX (uri) {

        this.audio = new Audio();
        this.audio.src = uri;

    }

    SFX.prototype.play = function (volume) {

        this.audio.play();

        if (volume !== undefined) {

            this.audio.volume = volume;

        }

    }

    return SFX

});
