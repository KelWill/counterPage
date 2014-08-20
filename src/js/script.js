var _ = {};
_.each = function(coll, fn){
    if (Array.isArray(coll)){
        for (var i = 0; i < coll.length; i++){
            fn(coll[i], i);
        }
    } else {
        for (var key in coll){
            fn(coll[key], key);
        }
    }
};

_.map = function(array, fn){
    var results = [];
    _.each(array, function(a, i){
        results.push(fn(a, i));
    });
    return results;
}
var app = {};

app.defaults = {
    'counter1': '10,300,000,000',
    'counter2': '113,000,000',
    'counter3': '43,161'
};
function makeCounter(id, config){
    config = config || {};
    var counterConfig = {
        initial: '0:00.0',
        direction: 'up',
        format: '9999999999',
        interval: '1',
    };

    for (var key in config){
        counterConfig[key] = config[key];
    }

    counterConfig.initial = localStorage.getItem(id) || app.defaults[id];
    counterConfig.id = id;

    return counterConfig;
};

function start(){
    var counters = [
        makeCounter('counter1', {
            format: '99,999,999,999',
            initial: '10,300,000,000',
            interval: '1'
        }),
        makeCounter('counter2', {
            format: '999,999,999',
            initial: '113,000,000',
            interval: '25'
        }),
        makeCounter('counter3', {
            format: '99,999',
            initial: '43,161',
            interval: '30000'
        })
    ];

    for (var i = 0; i < counters.length; i++){
        var c = counters[i];
        $('#' + c.id).addClass('counter-analog').counter(c);
    }

    setInterval(saveState, 1000);
}

function calcNum(parts){
    var vals = _.map(parts, function(p){
        var str = '';
        var len = (p.value + '').length;
        var limitLength = ('' + p.limit).length;
        var diff = limitLength - len;
        if (diff === 2){ str = '00'; }
        else if (diff === 1){ str = '0'; }
        return str +  p.value;
    });
    return vals.join(',');

    return sum;
};

function saveState(){
    _.each(['counter1', 'counter2', 'counter3'], function(c){
        var counter = $('#' + c);
        var data = counter.data('counter');
        var sum = calcNum(data.parts);

        localStorage.setItem(c, sum);
    });
};

function resetState(){
    _.each(app.defaults, function(v, c){
        localStorage.setItem(c, v)
    });
};

function restart(){
    resetState();
    start();
};

$(document).on('unload', saveState);
$(document).on('ready', start);
