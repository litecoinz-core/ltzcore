'use strict';

var ltzcore = module.exports;

// module information
ltzcore.version = 'v' + require('./package.json').version;
ltzcore.versionGuard = function(version) {
  if (version !== undefined) {
    var message = 'More than one instance of ltzcore-lib-cash found. ' +
      'Please make sure to require ltzcore-lib and check that submodules do' +
      ' not also include their own ltzcore-lib dependency.';
    throw new Error(message);
  }
};
ltzcore.versionGuard(global._ltzcoreCash);
global._ltzcoreCash = ltzcore.version;

// crypto
ltzcore.crypto = {};
ltzcore.crypto.BN = require('./lib/crypto/bn');
ltzcore.crypto.ECDSA = require('./lib/crypto/ecdsa');
ltzcore.crypto.Schnorr = require('./lib/crypto/schnorr');
ltzcore.crypto.Hash = require('./lib/crypto/hash');
ltzcore.crypto.Random = require('./lib/crypto/random');
ltzcore.crypto.Point = require('./lib/crypto/point');
ltzcore.crypto.Signature = require('./lib/crypto/signature');

// encoding
ltzcore.encoding = {};
ltzcore.encoding.Base58 = require('./lib/encoding/base58');
ltzcore.encoding.Base58Check = require('./lib/encoding/base58check');
ltzcore.encoding.BufferReader = require('./lib/encoding/bufferreader');
ltzcore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
ltzcore.encoding.Varint = require('./lib/encoding/varint');

// utilities
ltzcore.util = {};
ltzcore.util.buffer = require('./lib/util/buffer');
ltzcore.util.js = require('./lib/util/js');
ltzcore.util.preconditions = require('./lib/util/preconditions');
ltzcore.util.base32 = require('./lib/util/base32');
ltzcore.util.convertBits = require('./lib/util/convertBits');

// errors thrown by the library
ltzcore.errors = require('./lib/errors');

// main bitcoin library
ltzcore.Address = require('./lib/address');
ltzcore.Block = require('./lib/block');
ltzcore.MerkleBlock = require('./lib/block/merkleblock');
ltzcore.BlockHeader = require('./lib/block/blockheader');
ltzcore.HDPrivateKey = require('./lib/hdprivatekey.js');
ltzcore.HDPublicKey = require('./lib/hdpublickey.js');
ltzcore.Networks = require('./lib/networks');
ltzcore.Opcode = require('./lib/opcode');
ltzcore.PrivateKey = require('./lib/privatekey');
ltzcore.PublicKey = require('./lib/publickey');
ltzcore.Script = require('./lib/script');
ltzcore.Transaction = require('./lib/transaction');
ltzcore.URI = require('./lib/uri');
ltzcore.Unit = require('./lib/unit');

// dependencies, subject to change
ltzcore.deps = {};
ltzcore.deps.bnjs = require('bn.js');
ltzcore.deps.bs58 = require('bs58');
ltzcore.deps.Buffer = Buffer;
ltzcore.deps.elliptic = require('elliptic');
ltzcore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
ltzcore.Transaction.sighash = require('./lib/transaction/sighash');
