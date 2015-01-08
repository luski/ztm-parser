/*global require, module*/

'use strict';

var str = require('../utils/string.js');

function parse(content) {
    return str.splitByNL(content).map(parseItem);
}

function parseItem(line) {
    var data = str.splitBySpace(line),
        date = data.shift();
        
    data.shift();
    return {
        date: date,
        types: data
    };
}

module.exports = parse;