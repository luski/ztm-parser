/*global require, module*/

'use strict';
var downloader = require('./utils/downloader.js'),
    reader = require('./utils/modules-reader.js'),

    parseDaysTypes = require('./parsers/days-types.js'),
    parseCalendar = require('./parsers/course-calendar.js'),
    parseLinesPerDay = require('./parsers/available-lines-per-day'),
    parseBusStopsGroups = require('./parsers/bus-stops-groups.js'),
    parseBusStops = require('./parsers/bus-stops.js'),
    parseCities = require('./parsers/cities.js'),
    createSchedulesParser = require('./parsers/schedules.js');

function getDataSourcesURLs() {
    return downloader.getDataSourcesURLs();
}

/**
 * @param {string} url
 * @param {object} handlers
 * @param {function} [handlers.onGetDayTypes]
 * @param {function} [handlers.onGetCalendar]
 * @param {function} [handlers.onGetLinesPerDay]
 * @param {function} [handlers.onGetBusStopsGroups]
 * @param {function} [handlers.onGetBusStops]
 * @param {function} [handlers.onGetCities]
 * @param {function} [handlers.onGetSchedules]
 */
function parseZTMDataSource(url, handlers) {
    var schedulesParser = createSchedulesParser(),
        busStops = {};

    downloader.download(url).then(function (dbPath) {
        return reader.readDatabaseFile(dbPath, function (moduleName, moduleContent) {
            if (moduleName === 'TY' && typeof handlers.onGetDayTypes === 'function') {
                handlers.onGetDayTypes(parseDaysTypes(moduleContent));
            }
            if (moduleName === 'KA' && typeof handlers.onGetCalendar === 'function') {
                handlers.onGetCalendar(parseCalendar(moduleContent));
            }
            if (moduleName === 'KD' && typeof handlers.onGetLinesPerDay === 'function') {
                handlers.onGetLinesPerDay(parseLinesPerDay(moduleContent));
            }
            if (moduleName === 'ZA' && typeof handlers.onGetBusStopsGroups === 'function') {
                handlers.onGetBusStopsGroups(parseBusStopsGroups(moduleContent));
            }
            if (moduleName === 'PR' && typeof handlers.onGetBusStops === 'function') {
                parseBusStops(moduleContent, busStops);
            }
            if (moduleName === 'SM' && typeof handlers.onGetCities === 'function') {
                handlers.onGetCities(parseCities(moduleContent));
            }
            if (moduleName === 'LL') {
                schedulesParser.parseTransportLines(moduleContent);
            }
            if (moduleName === 'TR') {
                schedulesParser.parseRoutesDescriptors(moduleContent);
            }
            if (moduleName === 'LW') {
                schedulesParser.parseRoute(moduleContent);
            }
            if (moduleName === 'TD') {
                schedulesParser.parseSchedulesForDayTypes(moduleContent);
            }
            if (moduleName === 'WG') {
                schedulesParser.parseSchedule(moduleContent);
            }
            if (moduleName === 'OP') {
                schedulesParser.parseLegend(moduleContent);
            }
        }).then(function () {
            if (handlers.onGetBusStops === 'function') {
                handlers.onGetBusStops(busStops);
            }
            if (handlers.onGetSchedules === 'function') {
                handlers.onGetSchedules(schedulesParser.result);
            }
        });
    });
}

module.exports = {
    getDataSourcesURLs: getDataSourcesURLs,
    parseZTMDataSource: parseZTMDataSource
};