/*global require, module*/

'use strict';

var str = require('../../utils/string.js');

/**
 * @returns {{parse: function, allBeginDateTexts: string[], allCommentTexts: string[], allLegendTexts: string[]}}
 */
function createLegendParser() {
    var allBeginDateTexts = [],
        allCommentTexts = [],
        allLegendTexts = [];

    function parse(input) {
        return parseLegend(input);
    }

    return {
        parse: parse,
        allBeginDateTexts: allBeginDateTexts,
        allCommentTexts: allCommentTexts,
        allLegendTexts: allLegendTexts
    };

    /////////////// IMPLEMENTATION

    function parseLegend(input) {
        var inputLines = unwrap(str.splitByNL(input)).map(function (text) {
                return text.trim();
            }),
            beginDateText = filterLegend([inputLines.shift()], 'D')[0],
            commentTexts = filterLegend(inputLines, 'K'),
            legendTexts = filterLegend(inputLines, 'S');

        return {
            b: addText(allBeginDateTexts, beginDateText), // beginDateText
            c: addTexts(allCommentTexts, commentTexts), // commentTexts
            l: addTexts(allLegendTexts, legendTexts) // legend
        };
    }


    function unwrap(inputLines) {
        var result = [], inputLine, i;

        for (i = 0; i < inputLines.length; i++) {
            inputLine = inputLines[i];
            if (isPartialLegendLine(inputLine)) {
                result[result.length - 1] += formatPartialLegendLine(inputLine);
            } else {
                result.push(inputLine);
            }
        }

        return result;
    }

    function isPartialLegendLine(inputLine) {
        var prefix = inputLine.trim().substring(0, 9);
        return prefix.indexOf('S ') === 0 && prefix.indexOf('-') === -1;
    }

    function formatPartialLegendLine(inputLine) {
        return ' ' + str.splitBySpace(inputLine).splice(1).join(' ').trim();
    }

    function filterLegend(input, prefix) {
        return input.filter(function (text) {
            return text.indexOf(prefix) === 0;
        }).map(function (text) {
            return text.substring(2).trim();
        });
    }

    function addText(dst, text) {
        var id = dst.indexOf(text);
        if (id === -1) {
            id = dst.length;
            dst.push(text);
        }
        return id;
    }

    function addTexts(dst, texts) {
        return texts.map(function (text) {
            return addText(dst, text);
        });
    }
}

module.exports = createLegendParser;