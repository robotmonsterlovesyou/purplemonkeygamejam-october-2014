/*global require, casper*/

require('../libs/Facade.js/polyfills/requestAnimationFrame-polyfill');
var Facade = require('../libs/Facade.js/facade.min');
var SAT = require('../libs/sat-js/SAT.min');
require('../facadejs-SAT');

casper.test.info('Collision Tests');

casper.test.begin('Basic Vector Collision', function suite(test) {

    'use strict';

    var rect = new Facade.Rect({ x: 0, y: 0, width: 200, height: 200 }),
        circle = new Facade.Circle({ x: 0, y: 0, radius: 100 }),
        polygon = new Facade.Polygon({ x: 0, y: 0, points: [ [100, 0], [200, 100], [100, 200], [0, 100] ] });

    rect.SAT('setVector');
    circle.SAT('setVector');
    polygon.SAT('setVector');

    test.assertEquals(rect.SAT('testCollision', new SAT.Vector(100, 100)), true, 'Vector collided with the rectangle.');
    test.assertEquals(rect.SAT('testCollision', new SAT.Vector(0, 0)), true, 'Vector collided with the rectangle.');
    test.assertEquals(rect.SAT('testCollision', new SAT.Vector(205, 205)), false, 'Vector did not collide with the rectangle.');

    test.assertEquals(circle.SAT('testCollision', new SAT.Vector(100, 100)), true, 'Vector collided with the circle.');
    test.assertEquals(circle.SAT('testCollision', new SAT.Vector(0, 0)), false, 'Vector did not collide with the circle.');
    test.assertEquals(circle.SAT('testCollision', new SAT.Vector(15, 15)), false, 'Vector did not collide with the circle.');

    test.assertEquals(polygon.SAT('testCollision', new SAT.Vector(100, 100)), true, 'Vector collided with the polygon.');
    test.assertEquals(polygon.SAT('testCollision', new SAT.Vector(100, 1)), true, 'Vector collided with the polygon.');
    test.assertEquals(polygon.SAT('testCollision', new SAT.Vector(0, 0)), false, 'Vector did not collide with the polygon.');
    test.assertEquals(polygon.SAT('testCollision', new SAT.Vector(200, 200)), false, 'Vector did not collide with the polygon.');

    test.done();

});

casper.test.begin('Scaled Vector Collision', function suite(test) {

    'use strict';

    var rect = new Facade.Rect({ x: 0, y: 0, width: 200, height: 200, scale: 2 }),
        circle = new Facade.Circle({ x: 0, y: 0, radius: 100, scale: 2 }),
        polygon = new Facade.Polygon({ x: 0, y: 0, points: [ [100, 0], [200, 100], [100, 200], [0, 100] ], scale: 2 });

    rect.SAT('setVector');
    circle.SAT('setVector');
    polygon.SAT('setVector');

    test.assertEquals(rect.SAT('testCollision', new SAT.Vector(0, 0)), true, 'Vector collided with the rectangle.');
    test.assertEquals(rect.SAT('testCollision', new SAT.Vector(100, 100)), true, 'Vector collided with the rectangle.');
    test.assertEquals(rect.SAT('testCollision', new SAT.Vector(200, 200)), true, 'Vector collided with the rectangle.');
    test.assertEquals(rect.SAT('testCollision', new SAT.Vector(300, 300)), true, 'Vector collided with the rectangle.');

    test.assertEquals(rect.SAT('testCollision', new SAT.Vector(-5, -5)), false, 'Vector did not collide with the rectangle.');
    test.assertEquals(rect.SAT('testCollision', new SAT.Vector(405, 405)), false, 'Vector did not collide with the rectangle.');

    test.assertEquals(circle.SAT('testCollision', new SAT.Vector(75, 75)), true, 'Vector collided with the circle.');
    test.assertEquals(circle.SAT('testCollision', new SAT.Vector(200, 200)), true, 'Vector collided with the circle.');
    test.assertEquals(circle.SAT('testCollision', new SAT.Vector(325, 325)), true, 'Vector collided with the circle.');

    test.assertEquals(circle.SAT('testCollision', new SAT.Vector(0, 0)), false, 'Vector did not collide with the circle.');
    test.assertEquals(circle.SAT('testCollision', new SAT.Vector(30, 30)), false, 'Vector did not collide with the circle.');
    test.assertEquals(circle.SAT('testCollision', new SAT.Vector(400, 400)), false, 'Vector did not collide with the circle.');

    test.assertEquals(polygon.SAT('testCollision', new SAT.Vector(200, 200)), true, 'Vector collided with the polygon.');
    test.assertEquals(polygon.SAT('testCollision', new SAT.Vector(200, 1)), true, 'Vector collided with the polygon.');
    test.assertEquals(polygon.SAT('testCollision', new SAT.Vector(200, 400)), true, 'Vector collided with the polygon.');

    test.assertEquals(polygon.SAT('testCollision', new SAT.Vector(0, 0)), false, 'Vector did not collide with the polygon.');
    test.assertEquals(polygon.SAT('testCollision', new SAT.Vector(400, 400)), false, 'Vector did not collide with the polygon.');

    test.done();

});
