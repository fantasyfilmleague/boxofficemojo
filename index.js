'use strict';

var moment = require('moment');
var cheerio = require('cheerio');
var request = require('request');

var BOX_OFFICE_MOJO_URL = 'http://boxofficemojo.com';

exports.getReleasesByYear = function (year, callback) {
  var url;

  year = parseInt(year);

  if (isNaN(year)) {
    return callback('year must be a number');
  }

  url = BOX_OFFICE_MOJO_URL + '/schedule/?view=bydate&release=theatrical&yr=' + year + '&p=.htm';

  request(url, function (error, response, body) {
    var $;

    if (error) {
      return callback(error);
    }

    $ = cheerio.load(body);

    var values = $('font[size="2"] a[href^="/movies/"]').map(function (index, title) {
			return {title: $(title).find('*:not(:has(*))').first().text()};
		});

    callback(null, values);
  });
};

(function () {

  // todo: add sanitizers to convert things to stronger types than strings
	var manipulators = [
		{ name: 'td', selector: '*:not(:has(*))' },
		{ name: 'yd', selector: '*:not(:has(*))' },
		{ name: 'title', selector: '*:not(:has(*))' },
		{ name: 'studio', selector: '*:not(:has(*))' },
		{ name: 'dailyGross', selector: '*:not(:has(*))' },
		{ name: 'percentChangeYear', selector: '*:not(:has(*))' },
		{ name: 'percentChangeLastWeek', selector: '*:not(:has(*))' },
		{ name: 'theaters', selector: '*:not(:has(*))' },
		{ name: 'theaterGrossAverage', selector: '*:not(:has(*))' },
		{ name: 'grossToDate', selector: '*:not(:has(*))' },
		{ name: 'day', selector: '*:not(:has(*))' }
	];

  exports.getGrossesByDate = function (date, callback) {
    var url;
    var formattedDate;

    if (!date) {
      return callback('date must be specified');
    }

    formattedDate = moment(date).format('YYYY-MM-DD')

    url = BOX_OFFICE_MOJO_URL + '/daily/chart/?view=1day&sortdate=' + formattedDate + '&p=.htm';

    request(url, function (error, response, body) {
      var $;

      if (error) {
        return callback(error);
      }

      $ = cheerio.load(body);

      var values = $('table[cellpadding="5"] tr+tr').map(function (_, row) {
        var value = {};

        $(row).children('td').each(function (index, row) {
          var manipulator = manipulators[index];
          value[manipulator.name] = $(row).find(manipulator.selector).first().text();
        });

        return value;
      });

      callback(null, values);
    });
  };

}());
