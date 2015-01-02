/*global require, module*/

'use strict';

var splitter = require('../../utils/splitter.js');

/**
 * @returns {{parse: function, schedules: object[]}}
 */
function createScheduleParser() {
    var schedules = [];

    function parse(content) {
        schedules.push(parseSchedule(content));
    }

    return {
        parse: parse,
        schedules: schedules
    };
}

module.exports = createScheduleParser;

////////// IMPLEMENTATION

function parseSchedule(content) {
    return splitter.byNL(content).map(parseHourSchedule);
}

function parseHourSchedule(input) {
    var fields = splitter.bySpace(input);

    return {
        hour: parseInt(fields[2]),
        schedule: fields.slice(3).map(parseMinute)
    };
}

function parseMinute(text) {
    var isLowFloor = text.charAt(0) === '[',
        minute;

    text = text.substring(1);
    minute = parseInt(text);

    while (isNumber(text.charAt(0))) {
        text = text.substring(1);
    }

    return {
        isLowFloor: isLowFloor,
        minute: minute,
        symbols: text.split('').filter(function (symbol) {
            return !!symbol.length && symbol !== ']' && symbol !== '^';
        })
    };
}

function isNumber(char) {
    return char >= '0' && char <= '9';
}

