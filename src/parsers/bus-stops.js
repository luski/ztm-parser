/*global require, module*/

'use strict';

var str = require('../utils/string.js'),

    typesMap = {
        'stały': 'permanent',
        'na żądanie': 'onDemand',
        'dla wsiadających': 'embarkation',
        'dla wysiadających': 'disembarkation',
        'krańcowy': 'ultimate',
        'postojowy': 'halting'
    };

function parse(content, result) {
    var inputLines = str.splitByNL(content);
    while (inputLines.length) {
        parseBusStop(inputLines, result);
    }
}

function parseBusStop(inputLines, result) {
    var busStopHeader = parseHeader(inputLines),
        busStopGroupId = busStopHeader.busStopGroupId,
        typesCount = busStopHeader.typesCount,
        i;

    delete busStopHeader.busStopGroupId;
    delete busStopHeader.typesCount;

    busStopHeader.lines = {};

    for (i = 0; i < typesCount; i++) {
        parseBuses(inputLines.shift().trim(), busStopHeader.lines);
    }

    if (!result[busStopGroupId]) {
        result[busStopGroupId] = [];
    }
    result[busStopGroupId].push(busStopHeader);
}

function parseBuses(input, busLines) {
    var fields = str.splitByLengths(input, [8, 20]),
        type = parseType(fields[1]);

    busLines[typesMap[type]] = str.splitBySpace(fields[2]);
}

function parseHeader(lines) {
    var header = str.splitByLengths(lines.shift().trim(), [6, 10, 43, 40, 17]);
    return {
        busStopGroupId: parseInt(header[0].substring(0, 4)),
        busStopId: parseInt(header[0].substring(4, 6)),
        typesCount: parseInt(header[1]),
        street: parseName(header[2]),
        destination: parseName(header[3]),
        yGPS: header[4].substring(2).trim(),
        xGPS: header[5].substring(2).trim()
    };
}

function parseName(text) {
    return str.removeDelimiterAtEnd(text, ',');
}

function parseType(text) {
    return str.removeDelimiterAtEnd(text, ':');
}

module.exports = parse;