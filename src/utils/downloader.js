/*global module, require*/

'use strict';

var Promise = require('promise'),
    _7z = require('node-7z'),
    fs = require('fs'),
    FtpClient = require('ftp'),

    TMP_PATH = '/tmp',

    archiveFileName = null,
    archivePath = null,
    dstPath = null;

function execute(url) {
    return download(url)
        .then(extract)
        .then(deleteArchive)
        .then(function () {
            return dstPath;
        });
}

function download(address) {
    return new Promise(function (resolve, reject) {
        var client = new FtpClient(),
            fileName = getFilePath(address);

        archiveFileName = new Date().getTime() + '.' + address.split('.').pop();
        archivePath = TMP_PATH + '/' + archiveFileName;

        client.on('ready', function () {
            client.get(fileName, function (err, stream) {
                if (err) {
                    reject(err);
                    return;
                }
                stream.on('end', resolve);
                stream.once('close', function () {
                    client.end();
                });
                stream.pipe(fs.createWriteStream(archivePath));
            });
        });
        client.connect({host: getHost(address)});

    });
}

function getHost(address) {
    var prefix = 'ftp://';
    address = address.substring(prefix.length);
    return address.substring(0, address.indexOf('/'));
}

function getFilePath(address) {
    var host = getHost(address);
    return address.substring(address.indexOf(host) + host.length + 1);
}

function extract() {
    return new Promise(function (resolve, reject) {
        new _7z().extractFull(archivePath, TMP_PATH)
            .progress(function (files) {
                if (files.length === 1) {
                    dstPath = TMP_PATH + '/' + files[0];
                    resolve();
                }
                reject(new Error('Expected one extracted file'));
            })
            .then(resolve)
            .catch(reject);
    });
}

function deleteArchive() {
    return new Promise(function (resolve) {
        fs.unlink(archivePath, resolve);
    });
}

module.exports = {
    download: execute, 
    getDataSourcesURLs: require('./address.js').getDatabaseAddresses
};
