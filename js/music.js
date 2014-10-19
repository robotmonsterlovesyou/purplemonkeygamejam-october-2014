/*jslint browser: true */

define(function (require) {

    'use strict';

    return function (url) {

        // music stuff

        var audioContext = new AudioContext();
        var bgMusic;

        function fetchAudio (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                callback(xhr.response);
            };
            xhr.send();
        }
        function decodeAudio (arrayBuffer, callback) {
            audioContext.decodeAudioData(arrayBuffer, function(audioBuffer) {
                callback(audioBuffer)   ;
            });
        }

        function playAudio (audioBuffer, volume, delay) {
            bgMusic = audioContext.createBufferSource();
            bgMusic.buffer = audioBuffer;
            bgMusic.loop = true;
            var amp = audioContext.createGain();
            amp.gain.value = volume;
            bgMusic.connect(amp);
            amp.connect(audioContext.destination);
            bgMusic.start(audioContext.currentTime + delay);
        }

        function playBgMusic (bgFile, volume, delay) {
            stopBgMusic(delay);
            var bgBuffer = fetchAudio(bgFile, function( arrayBuffer ) {
            decodeAudio(arrayBuffer, function( audioBuffer ) {
                playAudio(audioBuffer, volume, delay);
            });
        });
        }

        function stopBgMusic (delay) {
            if (bgMusic !== undefined) {
                bgMusic.stop(audioContext.currentTime + delay);
            }
        }

        playBgMusic(url, 0.5, 0);

        // end music stuff

        return bgMusic;

    };

});
