/*global module, require*/

'use strict';

var FtpClient = require('ftp'),
    Promise = require('promise');

/**
 * Finds newest file in specified ftp address and returns full address of this file.
 * @param [host] Source host. If not defined 'rozklady.ztm.waw.pl' is taken.
 * @returns {Promise}
 */
function getDatabaseAddresses(host) {
    host = host || 'rozklady.ztm.waw.pl';
    return new Promise(function (resolve, reject) {
        var client = new FtpClient();
        client.on('ready', function () {
            client.list(function (error, list) {
                client.end();
                if (error) {
                    reject(error);
                }
                resolve(list.map(function (element) {
                    return 'ftp://' + host + '/' + element.name;
                }));
            });
        });
        client.on('error', reject);
        client.connect({host: host});
    });
}

module.exports = {
    getDatabaseAddresses: getDatabaseAddresses
};