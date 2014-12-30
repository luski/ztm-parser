/*global require, module*/

'use strict';

var splitter = require('../utils/splitter.js');

function parse(content) {
    return splitter.byNL(content).map(function (line) {
        line = line.trim();
        return {
            code: line.substring(0, 2),
            name: line.substring(5).trim()
        };
    });
}

module.exports = parse;