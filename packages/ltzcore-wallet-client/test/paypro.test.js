'use strict';

var _ = require('lodash');
var chai = chai || require('chai');
var sinon = sinon || require('sinon');
var should = chai.should();
var {PayPro: payPro} = require('../ts_build/lib/paypro');
var TestData = require('./testdata');

function mockRequest(bodyBuf, headers) {
  bodyBuf = _.isArray(bodyBuf) ? bodyBuf : [bodyBuf];
  payPro.r = {
    'get': (_url) => {
      return {
        set: (_k, _v) => { },
        query: (_opts) => { },
        end: (cb) => {
          return cb(null, {
            headers: headers || {},
            statusCode: 200,
            statusMessage: 'OK',
            text: bodyBuf.shift()
          })
        }
      }
    },
    'post': (_url) => {
      return {
        set: (_k, _v) => { },
        send: (_opts) => { },
        end: (cb) => {
          return cb(null, {
            headers: headers || {},
            statusCode: 200,
            statusMessage: 'OK',
            text: bodyBuf.shift()
          })
        }
      }
    }
  }

};

describe('paypro', function () {
  var clock, oldreq;
  before(function () {
    // Stub time before cert expiration at Mar 27 2016
    clock = sinon.useFakeTimers(1459105693843);

  });
  beforeEach(() => {
    oldreq = payPro.r;
  });
  after(function () {
    clock.restore();
  });
  afterEach(function () {
    payPro.r = oldreq;
  });

  it('Make and verify PP request', function (done) {
    mockRequest(Buffer.from(TestData.payProJson.btc.body, 'hex'), TestData.payProJson.btc.headers);
    payPro.get({
      url: 'https://test.bitpay.com/paypro',
      network: 'testnet',
      coin: 'btc',
    }, function (err, res) {
      should.not.exist(err);
      res.should.be.deep.equal({
        "amount": 769200,
        "coin": "btc",
        "expires": "2019-03-07T18:20:44.301Z",
        "memo": "Payment request for BitPay invoice 3oZcpotopVGcZ2stRw2dop for merchant GusPay",
        "network": "testnet",
        "paymentId": "3oZcpotopVGcZ2stRw2dop",
        "requiredFeeRate": 1.398,
        "toAddress": "qz78y0832kskq84rr4f9t22fequ5c0l4gu6wsehezr",
        "verified": true,
      });
      done();
    });
  });


  it('Should handle a failed (404) request', function (done) {
    payPro.r = {
      'get': (_url) => {
        return {
          set: (_k, _v) => { },
          query: (_opts) => { },
          end: (cb) => {
            return cb(null, {
              statusCode: 404,
              statusMessage: 'Not Found',
            }, 'This invoice was not found or has been archived');
          }
        }
      },
      'post': () => { }
    }
    payPro.get({
      url: 'https://test.bitpay.com/paypro',
      network: 'testnet',
      coin: 'btc',
    }, function (err, res) {
      should.exist(err);
      done();
    });
  });

  it('Should detect a tampered PP request (bad signature)', function (done) {
    let h = _.clone(TestData.payProJson.btc.headers);
    h.signature = 'xx';
    mockRequest(Buffer.from(TestData.payProJson.btc.body, 'hex'), h);
    payPro.get({
      url: 'https://test.bitpay.com/paypro',
      network: 'testnet',
      coin: 'btc',
    }, function (err, res) {
      err.toString().should.contain('signature invalid');
      done();
    });
  });


  it('Should detect a tampered PP request (bad amount)', function (done) {
    let b = JSON.parse(TestData.payProJson.btc.body);
    b.outputs[0].amount = 100;
    b = JSON.stringify(b);
    mockRequest(Buffer.from(b), TestData.payProJson.btc.headers);
    payPro.get({
      url: 'https://test.bitpay.com/paypro',
      network: 'testnet',
      coin: 'btc',
    }, function (err, res) {
      err.toString().should.contain('not match digest');
      done();
    });
  });


  it('should send a PP payment', function (done) {
    var opts = {
      rawTx: 'rawTx1',
      rawTxUnsigned: 'rawTxUnsigned',
      url: 'http://an.url.com/paypro',
      coin: 'btc',
    };
    mockRequest([Buffer.from('{"memo":"Payment seems OK"}'), Buffer.from('{"memo":"memo1"}')], {
    });
    payPro.send(opts, function (err, data, memo) {
      should.not.exist(err);
      memo.should.equal('memo1');
      done();
    });
  });


  it('should not send PP payment if verify fails', function (done) {
    var opts = {
      rawTx: 'rawTx1',
      rawTxUnsigned: 'rawTxUnsigned',
      url: 'http://an.url.com/paypro',
      coin: 'btc',
    };
    payPro.r = {
      'post': (_url) => {
        return {
          set: (_k, _v) => { },
          send: (_opts) => { },
          end: (cb) => {
            return cb(null, {
              statusCode: 400,
              statusMessage: 'ss',
            }, 'This invoice was not found or has been archived');
          }
        }
      }
    }
    payPro.send(opts, function (err, data, memo) {
      should.exist(err);
      done();
    });
  });

});
