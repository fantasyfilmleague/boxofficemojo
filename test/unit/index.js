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

  describe('#getGrossesByDate', function () {

    function invalidArgumentsTests(date, callback) {
      api.getGrossesByDate(date, function (error, films) {
        assert.ok(error);
        callback();
      });
    }

    it('should return an error when date is null', function (done) {
      invalidArgumentsTests(null, done);
    });

    it('should return an error when date is undefined', function (done) {
      invalidArgumentsTests(undefined, done);
    });

    it('should return an error when date is an empty string', function (done) {
      invalidArgumentsTests('', done);
    });

    it('should return an error when date is false', function (done) {
      invalidArgumentsTests(false, done);
    });

  });

});
