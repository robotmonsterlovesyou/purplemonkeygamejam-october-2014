/*jslint browser: true */

define(function (require) {

    'use strict';

    var faction = function () {

            this.name = 'Faction';
            this.color = 'hsl(106, 100%, 50%)',
            this.ability_base = {
                topSpeed: 0,
                thrust: 0.5,
                weapon_torque: 1
            };
            this.sp_weapon: null;

        };
});
