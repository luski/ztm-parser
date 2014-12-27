/*global require, module*/

'use strict';

var splitter = require('../utils/splitter.js');

function parse(content) {
    var result = [],
        lines = splitter.byNL(content);

    while (lines.length) {
        result.push(parseDay(lines));
    }

    return result;
}

function parseDay(lines) {
    var header = splitter.bySpace(lines.shift()),
        count = parseInt(header[1]),
        transportLines = [],
        i,
        item;

    for (i = 0; i < count; i++) {
        item = splitter.bySpace(lines.shift());
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