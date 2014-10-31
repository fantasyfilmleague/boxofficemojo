'use strict';

var assert = require('assert');
var api = require('../../index');

describe('boxofficemojo', function () {

  describe('#getReleasesByYear', function () {

    it('should get releases for the year 2013', function (done) {
      api.getReleasesByYear(2013, function (error, films) {
        assert.ifError(error);
        assert.ok(films.length);
        done();
      });
    });

  });

});
