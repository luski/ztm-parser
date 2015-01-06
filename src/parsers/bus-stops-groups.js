/*global require, module*/

'use strict';

var str = require('../utils/string.js');

function parse(content) {
    return str.splitByNL(content).map(parseBusStopGroup);
}

function parseBusStopGroup(line) {
    var items = str.splitByLengths(line.trim(), [7, 35, 4]);
    return {
        id: parseInt(items[0]),
        name: str.removeDelimiterAtEnd(items[1], ','),
        cityCode: items[2],
        cityName: items[3]
    };
}

module.exports = parse;