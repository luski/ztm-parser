/*global require, describe, before, after, it*/

'use strict';

var should = require('should'),
    parseDaysTypes = require('../src/parsers/days-types.js'),
    fs = require('fs'),
    Promise = require('promise');

describe('downloadTests', function() {
    it('should parse proper days types', function(done) {
        
        var expectedDaysTypes, daysTypes;
        
        getFileContent('/resource/days-types-content.output')
        .then(function(data) {
            expectedDaysTypes = JSON.parse(data);
            return getFileContent('/resource/days-types-content.input');
        })
        .then(function(data) {
            daysTypes = parseDaysTypes(data);
            daysTypes.should.be.eql(expectedDaysTypes);
        })
        .then(done, done);
    });
});

function getFileContent(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(__dirname + path, 'utf8', function(err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}