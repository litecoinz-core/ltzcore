"use strict";

var should = require('chai').should();
var ltzcore = require('../');

describe('#versionGuard', function() {
  it('global._ltzcore should be defined', function() {
    should.equal(global._ltzcoreCash, ltzcore.version);
  });

  it('throw an error if version is already defined', function() {
    (function() {
      ltzcore.versionGuard('version');
    }).should.throw('More than one instance of ltzcore');
  });
});
