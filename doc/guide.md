ZTM Parser Quick Guide
=============

To use the library first import it calling `require` function.

```javascript
var ZTMDataSourceParser = require('../src/ztm-parser.js');
```

Retrieving Data Source Address
-------------------

In order to parse ZTM Data Source you first must get the URL location of the Data Source. You can use the function
`getDataSourceURLs`, provided by the library, like here:

```javascript
ZTMDataSourceParser.getDataSourcesURLs().then(function (urls) {
    /* here you can do something with your obtained urls. */
});
```

The function returns a `Promise` object that resolves an array of URLs strings. The returned URLs has a following form:

```
 ftp://rozklady.ztm.waw.pl/RA150119.7z
```

* The name is meaningful. It always starts with 'RA' and after that prefix we have a date of the data source
(format: YYMMDD). The data source has specified validation period. It is valid between the specified date and the date
specified by the next data source file.

<pre>
For example if there are two following data source files in repository: 
RA010101.7z and RA.010106.7z 
then the first file is valid between 2001/01/01 and 2001/01/06 and the second one 
is valid from 2001/01/06 till now.
</pre>

* The extension is 7z because the data source is a big file (about 200MB) and has to be compressed.

Retrieving Data Source Address
-------------------

In order to retrieve all information from Data Source file use the function `parseZTMDataSource`.

```javascript
ZTMDataSourceParser.parseZTMDataSource(handler);
```

The function gets as an argument the object that contains following callback handlers:

* Day Types handler
* Calendar handler
* Lines per Day handler
* Groups of bus stops handler
* Bus Stops handler
* List of cities handler
* Schedules and routes handler

None of these handlers is required so you are not obligated to implement any handler that is not interesting for you. All handlers has the same form: a function that gets one argument. Thus complete callback handlers object can have following form:

```javascript
var handler = {
    onGetDayTypes: function (result) {
        //here you can do something with the result object
    },
    
    onGetCalendar: function (result) {
        //here you can do something with the result object
    },
    
    onGetLinesPerDay: function (result) {
        //here you can do something with the result object
    },
    
    onGetBusStopsGroups: function (result) {
        //here you can do something with the result object
    },
    
    onGetBusStops: function (result) {
        //here you can do something with the result object
    },
    
    onGetCities: function (result) {
        //here you can do something with the result object
    },
    
    onGetSchedules: function (result) {
        //here you can do something with the result object
    }
};
```

### Getting day's types

TO BE CONTINUED...
