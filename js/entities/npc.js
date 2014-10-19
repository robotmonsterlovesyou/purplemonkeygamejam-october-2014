/*jslint browser: true */
/*globals Facade */

define(function (require) {

    'use strict';

    var shipEntity = require('entities/ship');

    return function (faction, pos, direction) {

        var npc = new shipEntity('factions', faction, pos, direction);

        return npc;

    }

});
