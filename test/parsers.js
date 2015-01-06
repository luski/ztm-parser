/*global require, __dirname, describe, before, after, it*/

'use strict';

var should = require('should'),
    testParser = require('./util/test-parser.js'),

    parsers = [{
        parseFn: require('../src/parsers/days-types.js'),
        resourceFileName: 'days-types-content',
        description: 'parse proper days types'
    }, {
        parseFn: require('../src/parsers/available-lines-per-day.js'),
        resourceFileName: 'line-per-day-content',
        description: 'parse all available lines per day'
    }];

describe('Parsers Tests', function () {
    parsers.forEach(makeUnitTest);
});

function makeUnitTest(object) {
    it(object.description, function (done) {

        testParser(object.parseFn,
            __dirname + '/resource/' + object.resourceFileName + '.input',
            __dirname + '/resource/' + object.resourceFileName + '.output')
            .then(function (objects) {
                objects.parsedObject.should.be.eql(objects.expectedObject);
            })
            .then(done, done);
    });
}