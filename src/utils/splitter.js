/*global module*/

'use strict';

function notEmpty(string) {
    return !!string.length;
}

module.exports = {
    bySpace: function (line) {
        return line.split(' ').filter(notEmpty);
    },

    byNL: function (content) {
        return content.split('\n').filter(notEmpty);
    }
};