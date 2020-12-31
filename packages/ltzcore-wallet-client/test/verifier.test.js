'use strict';

var _ = require('lodash');
var chai = chai || require('chai');
var sinon = sinon || require('sinon');
var should = chai.should();

var { Verifier } = require('../ts_build/lib/verifier');
var { Key } = require('../ts_build/lib/key');

const aKey = new Key({
  seedData: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
  seedType: 'mnemonic'
});

describe('Verifier', function() {
  describe('checkAddress', function() {
    it('should verify a BTC  address', () => {
      let cred = aKey.createCredentials(null, { coin: 'btc', network: 'livenet', account: 0, n: 1 });
      cred.addWalletInfo('id', 'name', 1, 1, 'copayer');

      Verifier.checkAddress(cred, {
        address: '1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA',
        path: 'm/0/0',
        publicKeys: ['03aaeb52dd7494c361049de67cc680e83ebcbbbdbeb13637d92cd845f70308af5e']
      }).should.be.true;
    });
  });
});