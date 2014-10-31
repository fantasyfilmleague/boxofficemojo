'use strict';

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
