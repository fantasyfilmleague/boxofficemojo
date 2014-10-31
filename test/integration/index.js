'use strict';

var assert = require('assert');
var api = require('../../index');

describe('boxofficemojo', function () {

  describe('#getReleasesByYear', function () {

    it('should get releases for year in recent past', function (done) {
      api.getReleasesByYear(2013, function (error, films) {
        assert.ifError(error);
        assert.ok(films.length);
        done();
      });
    });

  });

  describe('#getGrossByDate', function () {

    it('should get film grosses by date in recent past', function (done) {
      api.getGrossesByDate('2014-08-14', function (error, films) {
        assert.ifError(error);
        assert.ok(films.length);
        done();
      });
    });

  });

});
