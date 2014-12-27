/*global require, module*/

'use strict';

var splitter = require('../utils/splitter.js');

function parse(content) {
    return splitter.byNL(content).map(parseBusStopGroup);
}

function parseBusStopGroup(line) {
    return {
        id: parseInt(line.substring(0, 7)),
        name: parseName(line.substring(7, 43)),
        cityCode: line.substring(43, 47).trim(),
        cityName: line.substring(47).trim()
    };
}

function parseName(text) {
    text = text.trim();
    if (text[text.length - 1] === ',') {
        text = text.substring(0, text.length - 1);
    }
    return text;
}

module.exports = parse;