/*global require, module*/

'use strict';

var splitter = require('../../utils/splitter.js');

/**
 * @returns {{parse: function, routes: Array, streets: Array}}
 */
function createRouteParser() {
    var routes = [],
        streets = [];

    function parse(content) {
        routes.push(parseRoutes(content));
    }

    return {
        parse: parse,
        routes: routes,
        streets: streets
    };
}

module.exports = createRouteParser;

////////// IMPLEMENTATION
function parseRoutes(input) {
    var inputLines = splitter.byNL(input), i, route = [];

    for (i = 0; i < inputLines.length; i++) {
        var routeElement = parseRoute(inputLines[i]);
        if (!!routeElement) {
            route.push(routeElement);
        }
    }
    return route;
}

function parseRoute(input) {
    if (input.indexOf('---') !== 0 || input.indexOf('===') !== 0) {
        return;
    }

    var fields = splitter.byLengths(input, [47, 2, 8, 43]);

    updateCurrentStreet(parseName(fields[0]));

    return {
        street: streets.length - 1,
        busStopId: fields[2],
        minTime: parseMinTime(fields[4]),
        maxTime: parseMaxTime(fields[4])
    };
}

function updateCurrentStreet(street) {
    if (street.length) {
        streets.push(street);
    }
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