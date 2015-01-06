/*global require, module*/

'use strict';

var str = require('../utils/string.js');

function parse(content) {
    return str.splitByNL(content).map(function (line) {
        var data = str.splitByLengths(line.trim(), [2]);
        return {
            code: data[0],
            name: data[1]
        };
    });
}

module.exports = parse;