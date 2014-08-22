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

_.copy = function(obj){
    var result = {};
    for (var key in obj){
        result[key] = obj[key];
    }
    return result;
};
var app = {};

app.originals = {
    'counter1': '10,893,200',
    'counter2': '312,100',
    'counter3': '875,293'
};
app.defaults = _.copy(app.originals);

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
    };

    counterConfig.initial = localStorage.getItem(id) || app.defaults[id];
    counterConfig.id = id;

    return counterConfig;
};

function start(){
    var counters = [
        makeCounter('counter1', {
            format: '999,999,999',
            interval: '50'
        }),
        makeCounter('counter2', {
            format: '9,999,999',
            interval: '2000'
        }),
        makeCounter('counter3', {
            format: '9,999,999',
            interval: '3000'
        })
    ];

    for (var i = 0; i < counters.length; i++){
        var c = counters[i];
        $('#' + c.id).addClass('counter-analog').counter(c);
    }

    setInterval(saveState, 1000);
};

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

function helpMessage(){
    console.log('To reset timers type:');
    console.log('restart()');
    console.log('and then hit enter');
    console.log('------------');
    showSetCounterHelpMessage();
    console.log('------------');
    console.log('To get back to initial values, type resetInitials();');
};

function showSetCounterHelpMessage(){
    console.log('To set a counter, type');
    console.log('setCounter(counterToSet, numberToSetCounterTo)');
    console.log('Where counterToSet is either 1, 2, or 3');
    console.log('And the number to set the counter to is a number');
    console.log('And then hit enter');
};

function setCounter(c, n){
    if (c !== 1 && c !== 2 && c !== 3 || typeof n !== 'number'){
        console.warn('Bad inputs!!!!!');
        showSetCounterHelpMessage();
        return;
    };
    c = 'counter' + c;
    var s = convertNumberToAppropriateString(n);
    localStorage.setItem(c, s);
    app.defaults[c] = s;
    restart();
    return "Nice Work";
};

function resetInitials(){
    app.defaults = _.copy(app.originals);
    restart();
};

function convertNumberToAppropriateString(n){
    var s = (n + '').split('');
    for (var i = s.length - 3; i > 0; i-=3){
        s.splice(i, 0, ',');
    }
    console.log(s, s.join(''));
    return s.join('');
};

function restart(){
    resetState();
    start();
};

$(document).on('unload', saveState);
$(document).on('ready', function(){
    start();
    helpMessage();
});
