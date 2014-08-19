var makeCounter = function(id, config){
    config = config || {};
    var counterConfig = {
        initial: '0:00.0',
        direction: 'up',
        format: '9999',
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

        }),
        makeCounter('counter2', {

        }),
        makeCounter('counter3', {
            
        })
    ];

    for (var i = 0; i < counters.length; i++){
        var c = counters[i];
        $('#' + c.id).addClass('counter-analog').counter(c);
    }
});