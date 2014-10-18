(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd !== undefined) {

        define(['facade', 'sat-js'], factory);

    } else {

        factory(Facade, SAT);

    }

}(this, function (Facade, SAT) {

    'use strict';

    var methods = {

        setVector: function () {

            var metrics = this.getAllMetrics(),
                options = this.getAllOptions(),
                point,
                points = [];

            if (this instanceof Facade.Circle) {

                point = new SAT.Vector(metrics.x + metrics.width / 2, metrics.y + metrics.height / 2);

                this._vector = new SAT.Circle(point, metrics.width / 2);

                return this._vector;

            } else if (this instanceof Facade.Rect) {

                point = new SAT.Vector(metrics.x, metrics.y);

                this._vector = new SAT.Box(point, metrics.width, metrics.height);

                return this._vector;

            } else if (this instanceof Facade.Polygon) {

                point = new SAT.Vector(metrics.x, metrics.y);

                options.points.forEach(function (point) {

                    points.push(new SAT.Vector(point[0], point[1]));

                });

                this._vector = new SAT.Polygon(point, points);

                return this._vector;

            } else if (this instanceof Facade.Entity) {

                point = new SAT.Vector(metrics.x, metrics.y);

                this._vector = new SAT.Box(point, metrics.width, metrics.height);

                return this._vector;

            }

        },
        getVector: function () {

            return this._vector;

        },
        hasVector: function () {

            return this._vector !== undefined;

        },
        testCollision: function (test) {

            var against = methods.getVector.call(this),
                results = false;

            if (against && test !== undefined) {

                if (against instanceof SAT.Box) {

                    against = against.toPolygon();

                }

                if (test instanceof Facade.Entity) {

                    test = test._vector;

                }

                if (test instanceof SAT.Box) {

                    test = test.toPolygon();

                }

                if (against instanceof SAT.Circle && test instanceof SAT.Vector) {

                    results = SAT.pointInCircle(test, against);

                } else if (against instanceof SAT.Polygon && test instanceof SAT.Vector) {

                    results = SAT.pointInPolygon(test, against);

                } else if (against instanceof SAT.Circle && test instanceof SAT.Circle) {

                    results = SAT.testCircleCircle(against, test);

                } else if (against instanceof SAT.Polygon && test instanceof SAT.Circle) {

                    results = SAT.testPolygonCircle(against, test);

                } else if (against instanceof SAT.Circle && test instanceof SAT.Polygon) {

                    results = SAT.testPolygonCircle(test, against);

                } else if (against instanceof SAT.Polygon && test instanceof SAT.Polygon) {

                    results = SAT.testPolygonPolygon(against, test);

                }

            } else {

                if (!methods.hasVector.call(this)) {

                    displayErrorMessage('Object has no set vectors. Run obj.SAT(\'setVector\') before testing for collisions.');

                } else if (!test) {

                    displayErrorMessage('No object has been specified to test against.');

                }

            }

            return results;

        }

    };

    Facade.Entity.prototype.SAT = function (method) {

        if (!methods[method]) {

            console.error(method + ' is not a method specified in this plugin.');

        }

        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

    };

    return Facade;

}));
