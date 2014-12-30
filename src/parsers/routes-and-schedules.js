/*global require, module*/

'use strict';

var splitter = require('../utils/splitter.js');

function Parser() {
    var routes = [],
        streets = [],
        allBeginDateTexts = [],
        allCommentTexts = [],
        allLegendTexts = [],
        legend = null;

    this.parseRoute = function (content) {
        var input = splitter.byNL(content), i, route = [];

        for (i = 0; i < input.length; i++) {
            var routeElement = parseRoute(input[i]);
            if (!!routeElement) {
                route.push(routeElement);
            }
        }

        routes.push(route);
    };

    function updateCurrentStreet(street) {
        if (street.length) {
            streets.push(street);
        }
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

    this.parseLegend = function (content) {
        var input = splitter.byNL(content).map(function (text) {
                return text.trim();
            }),

            beginDateText = filterLegend([input.shift()], 'D')[0],
            commentTexts = filterLegend(input, 'K'),
            legendTexts = filterLegend(input, 'S');

        legend = {
            beginDateText: addText(allBeginDateTexts, beginDateText),
            commentTexts: addTexts(allCommentTexts, commentTexts),
            legend: addTexts(allLegendTexts, legendTexts)
        };
    };

    function filterLegend(input, prefix) {
        return input.filter(function (text) {
            return text.indexOf(prefix) === 0;
        }).map(function (text) {
            return text.substring(2).trim();
        });
    }

    function addText(dst, text) {
        var id = dst.indexOf(text);
        if (id === -1) {
            id = dst.length;
            dst.push(text);
        }
        return id;
    }

    function addTexts(dst, texts) {
        return texts.map(function (text) {
            return addText(dst, text);
        });
    }

}

module.exports = Parser;