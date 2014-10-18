require.config({
    'paths': {
        'sat-js': '../bower_components/facadejs-SATjs-plugin/vendor/sat-js-0.4.1/SAT.min',
        'facade': '../bower_components/facade.js/facade.min',
        'facadejs-SATjs-plugin': '../bower_components/facadejs-SATjs-plugin/facadejs-SAT',
        'gamepadjs': '../bower_components/gamepad.js/gamepad.min',
        'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min'
    },
    'shim': {
        'sat-js': {
            'exports': 'sat-js'
        }
    }
});

define(['app']);
