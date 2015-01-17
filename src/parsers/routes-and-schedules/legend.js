/*global require, module*/

'use strict';

var __test = [];

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
            commentTexts = splitComments(filterLegend(inputLines, 'K')),
            legendTexts = filterLegend(inputLines, 'S');

        return {
            header: addText(allBeginDateTexts, beginDateText),
            comments: addTexts(allCommentTexts, commentTexts),
            legend: addTexts(allLegendTexts, legendTexts)
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
        var result = texts.map(function (text) {
            return addText(dst, text);
        });
        return result.length ? result : undefined;
    }

    /**
     * Comments sections in data source are pretty messed. This function tries to group comments properly.
     */
    function splitComments(comments) {
        var i, current = '', result = [];

        for (i = 0; i < comments.length; i++) {
            if (comments[i].length > 0) {
                current += comments[i] + '\n';
            } else if (current.length > 1 && current.charAt(current.length - 2) !== ':') {
                addComment(current, result);
                current = '';
            }
        }
        addComment(current, result);

        return result;
    }

    function addComment(commentText, dst) {
        commentText = str.removeDelimiterAtEnd(commentText, '\n');
        commentText = str.removeDelimiterAtEnd(commentText, '.');
        commentText = commentText.trim();
        if (!commentText.length) {
            return;
        }
        var idx = commentText.indexOf('TRASA CZASOWO ZMIENIONA');
        if (idx > 0) {
            addComment(commentText.substring(0, idx), dst);
            addComment(commentText.substring(idx), dst);
        } else {
            dst.push(commentText);
        }
    }
}

module.exports = createLegendParser;