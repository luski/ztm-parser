/*global module, require*/

'use strict';

var readLines = require('./lines-reader.js').readLines,
    modulesStack = [],
    moduleHandler;

function readDatabaseFile(filePath, handler) {
    moduleHandler = handler;
    return readLines(filePath, readLine);
}

function readLine(line) {
    line = line.trim();
    if (line.indexOf('*') === 0) {
        openModule(line);
    } else if (line.indexOf('#') === 0) {
        closeModule(moduleHandler);
    } else {
        modulesStack[modulesStack.length - 1].content += (line + '\n');
    }
}

function openModule(line) {
    modulesStack.push({
        name: line.substring(1, 3),
        content: ''
    });
}

function closeModule(moduleHandler) {
    if (!modulesStack.length) {
        return;
    }
    var module = modulesStack.pop();
    moduleHandler(module.name, module.content, module.count);
}

module.exports = {readDatabaseFile: readDatabaseFile};
