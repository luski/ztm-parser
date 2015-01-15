/*global require, module*/

'use strict';

var str = require('../../utils/string.js');

function parseSchedule(content) {
    return str.splitByNL(content).map(parseHourSchedule);
}

function parseHourSchedule(input) {
    var fields = str.splitBySpace(input);

    return {
        hour: parseInt(fields[2]),
        schedule: fields.slice(3).map(parseMinute)
    };
}

function parseMinute(text) {
    var isLowFloor = text.charAt(0) === '[',
        minute, symbols;

    text = text.substring(1);
    minute = parseInt(text);

    while (isNumber(text.charAt(0))) {
        text = text.substring(1);
    }

    symbols = text.split('').filter(function (symbol) {
        return !!symbol.length && symbol !== ']' && symbol !== '^';
    });
    return {
        lowFloor: isLowFloor ? 1 : undefined,
        minute: minute,
        symbols: symbols.length ? symbols : undefined
    };
}

function isNumber(char) {
    return char >= '0' && char <= '9';
}

module.exports = parseSchedule;