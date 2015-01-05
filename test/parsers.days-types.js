/*global require, describe, before, after, it*/

'use strict';

var should = require('should'),
    parseDaysTypes = require('../src/parsers/days-types.js'),
    fs = require('fs'),
    expectedDaysTypes = [{
        "code": "D1",
        "name": "PONIEDZIAŁEK"
    }, {
        "code": "D2",
        "name": "WTOREK"
    }, {
        "code": "D3",
        "name": "ŚRODA"
    }, {
        "code": "D4",
        "name": "CZWARTEK"
    }, {
        "code": "D5",
        "name": "PIĄTEK"
    }, {
        "code": "D6",
        "name": "SOBOTA"
    }, {
        "code": "D7",
        "name": "NIEDZIELA"
    }, {
        "code": "DP",
        "name": "DZIEŃ POWSZEDNI"
    }, {
        "code": "DS",
        "name": "ŚWIĘTO"
    }, {
        "code": "SB",
        "name": "SOBOTA"
    }, {
        "code": "N1",
        "name": "NOC PONIEDZIAŁEK/WTOREK"
    }, {
        "code": "N2",
        "name": "NOC WTOREK/ŚRODA"
    }, {
        "code": "N3",
        "name": "NOC ŚRODA/CZWARTEK"
    }, {
        "code": "N4",
        "name": "NOC CZWARTEK/PIĄTEK"
    }, {
        "code": "N5",
        "name": "NOC PIĄTEK/SOBOTA"
    }, {
        "code": "N6",
        "name": "NOC SOBOTA/NIEDZIELA"
    }, {
        "code": "N7",
        "name": "NOC NIEDZIELA/PONIEDZIAŁEK"
    }, {
        "code": "NS",
        "name": "ROZKŁAD NOCNY"
    }, {
        "code": "NP",
        "name": "ROZKŁAD WEEKENDOWY"
    }, {
        "code": "NO",
        "name": "ROZKŁAD NOCNY"
    }, {
        "code": "TS",
        "name": "ŚWIĘTO"
    }, {
        "code": "EX",
        "name": "ROZKŁAD SPEC."
    }, {
        "code": "S1",
        "name": "ROZKŁAD SPEC."
    }, {
        "code": "S2",
        "name": "ROZKŁAD SPEC."
    }, {
        "code": "SR",
        "name": "SOBOTA ROBOCZA"
    }, {
        "code": "WS",
        "name": "WOLNA SOBOTA"
    }];

describe('downloadTests', function() {
    it('should parse proper days types', function(done) {
        fs.readFile(__dirname + '/resource/days-types-content.txt', 'utf8', function(err, data) {
            if (err) throw err;

            parseDaysTypes(data).should.be.eql(expectedDaysTypes);
            done();
        });
    });
});
