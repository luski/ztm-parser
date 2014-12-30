/*global require, module*/

'use strict';

var splitter = require('../utils/splitter.js'),
    currentStreet = '';

function Parser() {
    this.routes = [];
}

// LW
Parser.prototype.parseRoute = function (content) {
    var input = splitter.byNL(content), i, route = [];

    for (i = 0; i < input.length; i++) {
        var routeElement = parseRoute(input[i]);
        if (!!routeElement) {
            route.push(routeElement);
        }
    }

    this.routes.push(route);
};

function updateCurrentStreet(street) {
    if (street.length) {
        currentStreet = street;
    }
}

function parseRoute(input) {
    if (input.indexOf('---') !== 0 || input.indexOf('===') !== 0) {
        return;
    }

    var fields = splitter.byLengths(input, [47, 2, 8, 43]);

    updateCurrentStreet(parseName(fields[0]));

    return {
        street: currentStreet,
        busStopId: fields[2],
        minTime: parseMinTime(fields[4]),
        maxTime: parseMaxTime(fields[4])
    };
}

function parseName(text) {
    if (text.charAt(text.length - 1) === ',') {
        text = text.substring(0, text.length - 1);
    }
    return text;
}

function parseMinTime(text) {
    text = text.substring(text.indexOf('|') + 1);
    return parseInt(text);
}

function parseMaxTime(text) {
    text = text.substring(text.indexOf('|') + 1);
    text = text.substring(text.indexOf('|') + 1);
    return parseInt(text);
}


// WG
Parser.prototype.parseDaySchedule = function (content) {

};

// OD

module.exports = Parser;