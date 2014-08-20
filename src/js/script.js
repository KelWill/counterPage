var makeCounter = function(id, config){
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

    counterConfig.id = id;

    return counterConfig;
};

$(document).on('ready', function(){
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
});