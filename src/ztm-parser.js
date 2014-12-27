/*global require, module*/

'use strict';

var downloader = require('./utils/downloader.js'),
    reader = require('./utils/modules-reader.js'),

    parsers = {
        TY: require('./parsers/days-types.js')
    };


/**
 *
 * @param {object} modulesHandler
 * @param {function} [modulesHandler.TY]
 */
function parseModules(modulesHandler) {
    downloader.download().then(function (dbPath) {
        reader.readDatabaseFile(dbPath, function (moduleName, moduleContent) {
            if (parsers[moduleName] && modulesHandler[moduleName]) {
                modulesHandler[moduleName](parsers[moduleName](moduleContent));
            }
        });
    });
}
