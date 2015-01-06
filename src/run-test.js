/*global require*/

'use strict';

var downloader = require('./utils/downloader.js'),
    reader = require('./utils/modules-reader.js'),

    parseDaysTypes = require('./parsers/days-types.js'),
    parseCalendar = require('./parsers/course-calendar.js'),
    parseLinesPerDay = require('./parsers/available-lines-per-day'),
    parseBusStopsGroups = require('./parsers/bus-stops-groups.js'),
    parseBusStops = require('./parsers/bus-stops.js'),
    parseCities = require('./parsers/cities.js'),
    createSchedulesParser = require('./parsers/schedules.js'),

    busStops = {},
    schedulesParser = createSchedulesParser();

//downloader.download().then(function (dbPath) {
var dbPath = '/home/lgi/RA141230.TXT', test = 200;
return reader.readDatabaseFile(dbPath, function (moduleName, moduleContent) {
    if (moduleName === 'TY') {
        //console.log(JSON.stringify(parseDaysTypes(moduleContent)));
    }
    if (moduleName === 'KA') {
        //console.log(JSON.stringify(parseCalendar(moduleContent)));
    }
    if (moduleName === 'KD') {
        //console.log(JSON.stringify(parseLinesPerDay(moduleContent)));
    }
    if (moduleName === 'ZA') {
        //console.log(JSON.stringify(parseBusStopsGroups(moduleContent)));
    }
    if (moduleName === 'PR') {
        //parseBusStops(moduleContent, busStops);
    }
    if (moduleName === 'SM') {
        //console.log(JSON.stringify(parseCities(moduleContent)));
    }
    // TR -> LW
    // TR -> RP -> TD -> WG, OD
    // TR -> RP -> OP
    // WK
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
}).catch(function (e) {
    console.error(e);
}).then(function () {
    console.log(JSON.stringify(schedulesParser.result));
});
//});
