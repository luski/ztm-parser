var parser = require('./ztm-parser.js');

parser.parseZTMDataSource('ftp://rozklady.ztm.waw.pl/RA150119.7z', {
    onGetSchedules: function (data) {
        console.log(JSON.stringify(data));
    }
});