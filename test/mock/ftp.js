/*global module, require*/

'use strict';

function FtpMock() {
    this.actions = {};
}

FtpMock.prototype.on = function (action, fn) {
    this.actions[action] = fn;
};

FtpMock.prototype.connect = function (params) {
    if (params.host !== 'rozklady.ztm.waw.pl') {
        this.actions.error(new Error('Wrong address'));
    } else {
        this.actions.ready();
    }
};

FtpMock.prototype.list = function (callback) {
    callback(null, [{date: new Date(), name: 'RA123456.7z'}]);
};

FtpMock.prototype.end = function () {

};

module.exports = FtpMock;