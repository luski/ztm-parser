/*global require, module*/

'use strict';

var str = require('../../utils/string.js');

/**
 * @returns {{parse: function, streets: Array}}
 */
function createRouteParser() {
    var streets = [],
        currentStreet = 0;

    function parse(content) {
        return parseRoutes(content);
    }

    return {
        parse: parse,
        streets: streets
    };

    ////////// IMPLEMENTATION

    function parseRoutes(input) {
        var inputLines = str.splitByNL(input), i, route = [];

        for (i = 0; i < inputLines.length; i++) {
            var routeElement = parseRoute(inputLines[i]);
            if (!!routeElement) {
                route.push(routeElement);
            }
        }
        return route;
    }

    function parseRoute(input) {
        if (input.indexOf('---') === 0 || input.indexOf('===') === 0) {
            return;
        }

        var fields = str.splitByLengths(input, [47, 2, 8, 43]);

        updateCurrentStreet(str.removeDelimiterAtEnd(fields[0], ','));

        return {
            street: currentStreet,
            id: fields[2], //bus stop id
            isSchedule: fields[1].indexOf('r') !== -1 ? 1 : undefined,
            min: parseMinTime(fields[4]),
            max: parseMaxTime(fields[4])
        };
    }

    function updateCurrentStreet(street) {
        if (street.length === 0) {
            return;
        }
        currentStreet = streets.indexOf(street);
        if (currentStreet === -1) {
            currentStreet = streets.length;
            streets.push(street);
        }
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
}

module.exports = createRouteParser;
