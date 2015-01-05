/*global require, describe, before, after, it*/

'use strict';

var fs = require('fs'),
    Promise = require('promise');

function getFileContent(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

module.exports = getFileContent;