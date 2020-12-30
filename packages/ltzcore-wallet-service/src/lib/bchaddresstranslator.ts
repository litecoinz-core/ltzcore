import _ from 'lodash';
const Ltzcore_ = {
  btc: require('ltzcore-lib'),
  bch: require('ltzcore-lib-cash')
};

export class BCHAddressTranslator {
  static getAddressCoin(address) {
    try {
      new Ltzcore_['btc'].Address(address);
      return 'legacy';
    } catch (e) {
      try {
        const a = new Ltzcore_['bch'].Address(address);
        if (a.toLegacyAddress() == address) return 'copay';
        return 'cashaddr';
      } catch (e) {
        return;
      }
    }
  }

  // Supports 3 formats:  legacy (1xxx, mxxxx); Copay: (Cxxx, Hxxx), Cashaddr(qxxx);
  static translate(addresses, to, from?) {
    let wasArray = true;
    if (!_.isArray(addresses)) {
      wasArray = false;
      addresses = [addresses];
    }
    from = from || BCHAddressTranslator.getAddressCoin(addresses[0]);

    let ret;
    if (from == to) {
      ret = addresses;
    } else {
      ret = _.filter(
        _.map(addresses, x => {
          const ltzcore = Ltzcore_[from == 'legacy' ? 'btc' : 'bch'];
          let orig;

          try {
            orig = new ltzcore.Address(x).toObject();
          } catch (e) {
            return null;
          }

          if (to == 'cashaddr') {
            return Ltzcore_['bch'].Address.fromObject(orig).toCashAddress(true);
          } else if (to == 'copay') {
            return Ltzcore_['bch'].Address.fromObject(orig).toLegacyAddress();
          } else if (to == 'legacy') {
            return Ltzcore_['btc'].Address.fromObject(orig).toString();
          }
        })
      );
    }
    if (wasArray) return ret;
    else return ret[0];
  }
}

module.exports = BCHAddressTranslator;
