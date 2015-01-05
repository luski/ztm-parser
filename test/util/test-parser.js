/*global require*/

'use strict';

var getFileContent = require('./get-file-content.js');

function testParser(parseFunction, inputFilePath, expectedOutputFilePath) {
    var expectedDaysTypes, daysTypes;

    return getFileContent(expectedOutputFilePath)
        .then(function(data) {
            expectedDaysTypes = JSON.parse(data);
            return getFileContent(inputFilePath);
        })
        .then(function(data) {
            daysTypes = parseFunction(data);
            return {
                expectedObject: expectedDaysTypes,
                parsedObject: daysTypes
            };
        });
}

module.exports = testParser;