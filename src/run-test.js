/*global require*/

'use strict';

var downloader = require('./utils/downloader.js'),
    reader = require('./utils/modules-reader.js'),

    parseDaysTypes = require('./parsers/days-types.js'),
    parseCalendar = require('./parsers/course-calendar.js'),
    parseLinesPerDay = require('./parsers/available-lines-per-day'),
    parseBusStopsGroups = require('./parsers/bus-stops-groups.js');

downloader.download().then(function (dbPath) {
    reader.readDatabaseFile(dbPath, function (moduleName, moduleContent) {
        if (moduleName === 'TY') {
            console.log(JSON.stringify(parseDaysTypes(moduleContent)));
        }
        if (moduleName === 'KA') {
            console.log(JSON.stringify(parseCalendar(moduleContent)));
        }
        if (moduleName === 'KD') {
            console.log(JSON.stringify(parseLinesPerDay(moduleContent)));
        }
        if (moduleName === 'ZA') {
            console.log(JSON.stringify(parseBusStopsGroups(moduleContent)));
        }
    }).catch(function (e) {
        console.error(e);
    });
});
