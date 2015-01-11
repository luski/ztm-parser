//ZTM Parser Quick Guide
//=============

/*global require*/

// To use the library first import it by require call.

var ZTMDataSourceParser = require('../src/ztm-parser.js');

// Retrieving Data Source Address
// -------------------

// In order to parse ZTM Data Source you first must get the URL location of the Data Source. You can use the function
// `getDataSourceURLs`, provided by the library, like here:

ZTMDataSourceParser.getDataSourcesURLs().then(function (urls) {
    /* here you can do something with your obtained urls. */
});

// The function returns a Promise object that resolves an array of URLs strings. The returned urls has a following form:

//```
// ftp://rozklady.ztm.waw.pl/RA150119.7z
//```

// * The name is meaningful. It always starts with 'RA' and after that prefix we have a date of the data source (format: YYMMDD). The data source is valid from the specified date to the date specified by the next datasource file.
// For example if we have in repository 2 files: RA010101.7z and RA.010106.7z then the first file is valid between 2001/01/01 and 2001/01/06.

// * The extension is 7z because the data source is a big file (about 200MB) and has to be compressed.

// Retrieving Data Source Address
// -------------------

// In order to retrieve all information from Data Source file use the function `parseZTMDataSource`.

ZTMDataSourceParser.parseZTMDataSource(handler);

// The function gets as an argument the object that contains all callback handlers:
// * Day Types handler
// * Calendar handler
// * Lines per Day handler
// * Groups of bus stops handler
// * Bus Stops handler
// * List of cities handler
// * Schedules and routes handler
//