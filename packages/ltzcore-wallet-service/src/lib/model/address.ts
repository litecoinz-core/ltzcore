import { Deriver } from 'crypto-wallet-core';
import _ from 'lodash';
import { AddressManager } from './addressmanager';

const $ = require('preconditions').singleton();
const Common = require('../common');
const Constants = Common.Constants,
  Defaults = Common.Defaults,
  Utils = Common.Utils;

export interface IAddress {
  version: string;
  createdOn: number;
  address: string;
  walletId: string;
  isChange: boolean;
  path: string;
  publicKeys: string[];
  coin: string;
  network: string;
  type: string;
  hasActivity: boolean;
  beRegistered: boolean;
}

export class Address {
  version: string;
  createdOn: number;
  address: string;
  walletId: string;
  isChange: boolean;
  path: string;
  publicKeys: string[];
  coin: string;
  network: string;
  type: string;
  hasActivity: boolean;
  beRegistered: boolean;

  static Ltzcore = {
    btc: require('ltzcore-lib')
  };

  static create(opts) {
    opts = opts || {};

    const x = new Address();

    $.checkArgument(Utils.checkValueInCollection(opts.coin, Constants.COINS));

    x.version = '1.0.0';
    x.createdOn = Math.floor(Date.now() / 1000);
    x.address = opts.address;
    x.walletId = opts.walletId;
    x.isChange = opts.isChange;
    x.path = opts.path;
    x.publicKeys = opts.publicKeys;
    x.coin = opts.coin;
    x.network = Address.Ltzcore[opts.coin]
      ? Address.Ltzcore[opts.coin].Address(x.address).toObject().network
      : opts.network;
    x.type = opts.type || Constants.SCRIPT_TYPES.P2SH;
    x.hasActivity = undefined;
    x.beRegistered = null;
    return x;
  }

  static fromObj(obj) {
    const x = new Address();

    x.version = obj.version;
    x.createdOn = obj.createdOn;
    x.address = obj.address;
    x.walletId = obj.walletId;
    x.coin = obj.coin || Defaults.COIN;
    x.network = obj.network;
    x.isChange = obj.isChange;
    x.path = obj.path;
    x.publicKeys = obj.publicKeys;
    x.type = obj.type || Constants.SCRIPT_TYPES.P2SH;
    x.hasActivity = obj.hasActivity;
    x.beRegistered = obj.beRegistered;
    return x;
  }

  static _deriveAddress(scriptType, publicKeyRing, path, m, coin, network) {
    $.checkArgument(Utils.checkValueInCollection(scriptType, Constants.SCRIPT_TYPES));

    const publicKeys = _.map(publicKeyRing, item => {
      const xpub = Address.Ltzcore[coin]
        ? new Address.Ltzcore[coin].HDPublicKey(item.xPubKey)
        : new Address.Ltzcore.btc.HDPublicKey(item.xPubKey);
      return xpub.deriveChild(path).publicKey;
    });

    let ltzcoreAddress;
    switch (scriptType) {
      case Constants.SCRIPT_TYPES.P2WSH:
        const nestedWitness = false;
        ltzcoreAddress = Address.Ltzcore[coin].Address.createMultisig(
          publicKeys,
          m,
          network,
          nestedWitness,
          'witnessscripthash'
        );
        break;
      case Constants.SCRIPT_TYPES.P2SH:
        ltzcoreAddress = Address.Ltzcore[coin].Address.createMultisig(publicKeys, m, network);
        break;
      case Constants.SCRIPT_TYPES.P2WPKH:
        ltzcoreAddress = Address.Ltzcore.btc.Address.fromPublicKey(publicKeys[0], network, 'witnesspubkeyhash');
        break;
      case Constants.SCRIPT_TYPES.P2PKH:
        $.checkState(
          _.isArray(publicKeys) && publicKeys.length == 1,
          'Failed state: publicKeys length < 1 or publicKeys not an array at <_deriveAddress()>'
        );

        if (Address.Ltzcore[coin]) {
          ltzcoreAddress = Address.Ltzcore[coin].Address.fromPublicKey(publicKeys[0], network);
        } else {
          const { addressIndex, isChange } = new AddressManager().parseDerivationPath(path);
          const [{ xPubKey }] = publicKeyRing;
          ltzcoreAddress = Deriver.deriveAddress(coin.toUpperCase(), network, xPubKey, addressIndex, isChange);
        }
        break;
    }

    return {
      address: ltzcoreAddress.toString(true),
      path,
      publicKeys: _.invokeMap(publicKeys, 'toString')
    };
  }

  static derive(walletId, scriptType, publicKeyRing, path, m, coin, network, isChange) {
    const raw = Address._deriveAddress(scriptType, publicKeyRing, path, m, coin, network);
    return Address.create(
      _.extend(raw, {
        coin,
        network,
        walletId,
        type: scriptType,
        isChange
      })
    );
  }
}
