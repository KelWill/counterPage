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
            initial: '10,000,000,000',
            interval: '25'
        }),
        makeCounter('counter2', {
            format: '999,999,999',
            initial: '100,000,000',
            interval: '500'
        }),
        makeCounter('counter3', {
            format: '99,999',
            initial: '10,000',
            interval: '5000'
        })
    ];

    for (var i = 0; i < counters.length; i++){
        var c = counters[i];
        $('#' + c.id).addClass('counter-analog').counter(c);
    }
});