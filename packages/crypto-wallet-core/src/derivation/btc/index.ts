const LtzcoreLib = require('ltzcore-lib');
import { IDeriver } from '..';
export abstract class AbstractLtzcoreLibDeriver implements IDeriver {
  public abstract ltzcoreLib;

  deriveAddress(network, pubKey, addressIndex, isChange) {
    const xpub = new this.ltzcoreLib.HDPublicKey(pubKey, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    return this.ltzcoreLib.Address(xpub.derive(path).publicKey, network).toString();
  }

  derivePrivateKey(network, xPriv, addressIndex, isChange) {
    const xpriv = new this.ltzcoreLib.HDPrivateKey(xPriv, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    const privKey = xpriv.derive(path).privateKey;
    const pubKey = privKey.publicKey;
    const address = this.ltzcoreLib.Address(pubKey, network).toString();
    return { address, privKey: privKey.toString(), pubKey: pubKey.toString() };
  }
}
export class BtcDeriver extends AbstractLtzcoreLibDeriver {
  ltzcoreLib = LtzcoreLib;
}
