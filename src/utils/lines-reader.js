/*global module, require*/

'use strict';

var fs = require('fs'),
    iconv = require('iconv');

function readLines(filePath, onLineRead) {
    var stream = fs.createReadStream(filePath),
        converter = new iconv.Iconv('windows-1250', 'utf8'),
        lastLine = '';

    stream.addListener('data', function (buffer) {
        var allBuffer = converter.convert(buffer).toString(),
            index = allBuffer.lastIndexOf('\r\n'),
            lines = null;

        if (index !== -1) {
            lines = lastLine + allBuffer.substring(0, index + 1);
            lines.split('\r\n').filter(isNotEmptyLine).forEach(onLineRead);
            lastLine = allBuffer.substring(index + 1);
        } else {
            lines = lastLine + allBuffer;
            lines.split('\r\n').filter(isNotEmptyLine).forEach(onLineRead);
            lastLine = '';
        }
    });
}

function isNotEmptyLine(line) {
    return !!line.length;
}

module.exports = {readLines: readLines};
