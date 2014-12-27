/*global require, module*/

'use strict';

var splitter = require('../utils/splitter.js');

function parse(content) {
    return splitter.byNL(content).map(parseItem);
}

function parseItem(line) {
    var data = splitter.bySpace(line);
    return {
        date: data[0],
        types: data[1]
    };
}

module.exports = parse;