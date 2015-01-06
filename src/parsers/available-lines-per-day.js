/*global require, module*/

'use strict';

var str = require('../utils/string.js');

function parse(content) {
    var result = [],
        lines = str.splitByNL(content);

    while (lines.length) {
        result.push(parseDay(lines));
    }

    return result;
}

function parseDay(lines) {
    var header = str.splitBySpace(lines.shift()),
        count = parseInt(header[1]),
        transportLines = [],
        i,
        item;

    for (i = 0; i < count; i++) {
        item = str.splitBySpace(lines.shift());
        transportLines.push({
            line: item[0],
            dayType: item[1]
        });
    }

    return {
        date: header[0],
        lines: transportLines
    };
}

module.exports = parse;