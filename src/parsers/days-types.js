/*global require, module*/

'use strict';

var str = require('../utils/string.js');

function parse(content) {
    return str.splitByNL(content).map(function (line) {
        line = line.trim();
        return {
            code: line.substring(0, 2),
            name: line.substring(5).trim()
        };
    });
}

module.exports = parse;