ZTM Parser Quick Guide
=============

To use the library first import it by calling the `require` function.

```javascript
var ZTMDataSourceParser = require('../src/ztm-parser.js');
```

Retrieving the Data Source Address
-------------------

In order to parse the ZTM Data Source you must first retrieve the URL location of the Data Source. You can use the
`getDataSourceURLs` function provided by the library, i.e.:

```javascript
ZTMDataSourceParser.getDataSourcesURLs().then(function (urls) {
    /* here you can do something with your obtained urls. */
});
```

The function returns a `Promise` object that resolves an array of URL strings. The returned strings have the following form:

```
 ftp://rozklady.ztm.waw.pl/RA150119.7z
```

* The name is meaningful. It always starts with 'RA' and following the prefix we have the date of the data source
(format: YYMMDD). The data source has a specified validation period. It is valid between the date of the first file and the following date from the next data source file.

<pre>
For example, there are two data source files in the repository: 
RA010101.7z and RA.010106.7z

The first file is valid between 2001/01/01 and 2001/01/06 and the second is valid from 2001/01/06 till now().
</pre>

* The extension is 7z because the data source is a big file (about 200MB) and requires compression.

Retrieving Data Source Addresses
-------------------

The `parseZTMDataSource` function retrieves all information from the data source file

```javascript
ZTMDataSourceParser.parseZTMDataSource(handler);
```

The function's argument is the object containing the following callback handlers:

* Types of Days handler
* Calendar handler
* Lines per Day handler
* Groups of bus stops handler
* Bus Stops handler
* List of cities handler
* Schedules and routes handler

All handlers are optional and have the same form: a function with one argument. Thus, a complete callback handler object can have the following form:

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

### Retrieving types of days

TO BE CONTINUED...
