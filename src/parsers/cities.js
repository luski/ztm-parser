/*global require, module*/

'use strict';

var splitter = require('../utils/splitter.js');

function parse(content) {
    return splitter.byNL(content).map(function (line) {
        var data = splitter.byLengths(line.trim(), [2]);
        return {
            code: data[0],
            name: data[1]
        };
    });
}

module.exports = parse;