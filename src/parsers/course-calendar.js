/*global require, module*/

'use strict';

var str = require('../utils/string.js');

function parse(content) {
    return str.splitByNL(content).map(parseItem);
}

function parseItem(line) {
    var data = str.splitBySpace(line);
    return {
        date: data[0],
        types: data[1]
    };
}

module.exports = parse;