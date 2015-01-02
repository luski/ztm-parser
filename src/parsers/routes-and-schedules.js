/*global require, module*/

'use strict';

var splitter = require('../utils/splitter.js'),
    createScheduleParser = require('./routes-and-schedules/schedule.js'),
    createRoutesParser = require('./routes-and-schedules/routes.js'),
    createLegendParser = require('./routes-and-schedules/legend.js');

/**
 * @returns {{parseRoute: function, parseLegend: function, parseSchedule: function}}
 */
function createRoutesAndSchedulesParser() {
    var routesParser = createRoutesParser(),
        scheduleParser = createScheduleParser(),
        legendParser = createLegendParser();

    return {
        parseRoute: parseRoute,
        parseLegend: parseLegend,
        parseSchedule: parseSchedule,
        print: print
    };

    ////////////// IMPLEMENTATION

    function parseRoute(content) {
        routesParser.parse(content);
    }

    function parseLegend(content) {
        legendParser.parse(content);
    }

    function parseSchedule(content) {
        scheduleParser.parse(content);
    }

    function print() {
        legendParser.allLegendTexts.forEach(function (x) {
            console.log(x);
        });
    }
}

module.exports = createRoutesAndSchedulesParser;