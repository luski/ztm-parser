/*global require, module*/

'use strict';

var splitter = require('../utils/splitter.js');

function parse(content) {
    return splitter.byNL(content).map(parseBusStopGroup);
}

function parseBusStopGroup(line) {
    var items = splitter.byLengths(line, [7, 35, 4]);
    return {
        id: parseInt(items[0]),
        name: parseName(items[1]),
        cityCode: items[2],
        cityName: items[3]
    };
}

function parseName(text) {
    if (text[text.length - 1] === ',') {
        text = text.substring(0, text.length - 1);
    }
    return text;
}

module.exports = parse;