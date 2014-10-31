'use strict';

var assert = require('assert');
var api = require('../../index');

describe('boxofficemojo', function () {

  describe('#getReleasesByYear', function () {

    function invalidArgumentsTests(year, callback) {
      api.getReleasesByYear(year, function (error, films) {
        assert.ok(error);
        callback();
      });
    }

    it('should return an error when year is null', function (done) {
      invalidArgumentsTests(null, done);
    });

    it('should return an error when year is undefined', function (done) {
      invalidArgumentsTests(undefined, done);
    });

    it('should return an error when year is a string', function (done) {
      invalidArgumentsTests('not a number', done);
    });

  });

});
