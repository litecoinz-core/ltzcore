import Ltzcore from 'ltzcore-lib';
import { expect } from 'chai';
import sinon from 'sinon';
import * as errors from '../../src/errors';
import PayId from '../../src/index';
import * as utils from '../../src/lib/utils';
import Verify from '../../src/lib/verify';
import * as TestKeys from '../keys';
import TestSignatures from '../signatures';

describe('PayId', () => {
  let keys;
  let addressBTC;
  const payId = 'test$example.com';

  before(() => {
    keys = {
      ltzcoreHD: Ltzcore.HDPrivateKey.fromString(TestKeys.LtzcoreHD),
      ltzcore: Ltzcore.PrivateKey.fromString(TestKeys.Ltzcore),
      ec: TestKeys.EC,
      ed25519: TestKeys.ED25519,
      rsa: TestKeys.RSA,
      sym: TestKeys.Symmetric
    };

    addressBTC = {
      paymentNetwork: 'BTC',
      addressDetailsType: 'CryptoAddressDetails',
      addressDetails: {
        address: 'mhjPjyyFgdMQwyhf2CnzEqfLS3LdAqkvkF'
      }
    };
  });

  describe('sign', () => {
    it('should sign with Ltzcore HD key', async () => {
      const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ltzcoreHD.toString());

      expect(signed).to.exist;
      expect(signed).to.have.property('payload');
      expect(typeof signed.payload).to.equal('string');
      expect(signed).to.have.property('signatures');
      expect(signed.signatures.length).to.equal(1);
    });

    it('should sign with Ltzcore non-HD key', async () => {
      const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ltzcore.toString());

      expect(signed).to.exist;
      expect(signed).to.have.property('payload');
      expect(typeof signed.payload).to.equal('string');
      expect(signed).to.have.property('signatures');
      expect(signed.signatures.length).to.equal(1);
    });

    it('should sign with crypto-created EC key', async () => {
      const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ec.privateKey);

      expect(signed).to.exist;
      expect(signed).to.have.property('payload');
      expect(typeof signed.payload).to.equal('string');
      expect(signed).to.have.property('signatures');
      expect(signed.signatures.length).to.equal(1);
    });

    it('should sign with crypto-created ED25519 key', async () => {
      const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ed25519.privateKey);

      expect(signed).to.exist;
      expect(signed).to.have.property('payload');
      expect(typeof signed.payload).to.equal('string');
      expect(signed).to.have.property('signatures');
      expect(signed.signatures.length).to.equal(1);
    });

    it('should sign with crypto-created RSA key', async () => {
      const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.rsa.privateKey);

      expect(signed).to.exist;
      expect(signed).to.have.property('payload');
      expect(typeof signed.payload).to.equal('string');
      expect(signed).to.have.property('signatures');
      expect(signed.signatures.length).to.equal(1);
    });

    it('should fail signing with Ltzcore HD public key', async () => {
      try {
        const pk = new Ltzcore.HDPublicKey(keys.ltzcoreHD);
        await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', pk.toString());
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal(errors.REQUIRE_PRIVATE_KEY);
      }
    });

    it('should fail signing with Ltzcore non-HD public key', async () => {
      try {
        const pk = new Ltzcore.PublicKey(keys.ltzcore);
        await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', pk.toString());
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal(errors.REQUIRE_PRIVATE_KEY);
      }
    });

    it('should fail signing with EC public key', async () => {
      try {
        await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ec.publicKey);
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal(errors.REQUIRE_PRIVATE_KEY);
      }
    });

    it('should fail signing with RSA public key', async () => {
      try {
        await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.rsa.publicKey);
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal(errors.REQUIRE_PRIVATE_KEY);
      }
    });

    it('should fail signing with symmetric key', async () => {
      try {
        await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.sym);
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal(errors.CANNOT_PARSE_PRIVATEKEY);
      }
    });
  });

  describe('verify', () => {
    describe('PayId.org utils signatures', () => {
      let signatures;
      before(() => {
        // These signatures were created with PayId official utils
        signatures = TestSignatures.payIdOrgUtils;
      });

      it('should fail verification if payId doesn\'t match', async () => {
        const verified = await PayId.verify('malicious$example.com', signatures.ltzcoreHD.BTC);
        expect(verified).be.false;
      });

      describe('keys', () => {
        it('should verify signature signed with EC key', async () => {
          const verified = await PayId.verify(payId, signatures.secp256k1.BTC);
          expect(verified).be.true;
        });
        it('should verify signature signed with ED25519 key', async () => {
          const verified = await PayId.verify(payId, signatures.ed25519.BTC);
          expect(verified).be.true;
        });
        it('should verify signature signed with RSA key', async () => {
          const inBrowserSpy = sinon.spy(utils, 'inBrowser');
          const _inBrowserVerifySpy = sinon.spy(Verify, '_verifyInBrowserRSA' as any); // use 'as any' to bypass sinon's typescript restriction to public class members
          const _nodeVerifySpy = sinon.spy(Verify, '_verifyNodeRSA' as any);

          const verified = await PayId.verify(payId, signatures.rsa.BTC);
          expect(verified).be.true;

          expect(inBrowserSpy.callCount).to.equal(1);
          if (utils.inBrowser()) {
            expect(_inBrowserVerifySpy.callCount).to.equal(1);
            expect(_nodeVerifySpy.callCount).to.equal(0);
          } else {
            expect(_inBrowserVerifySpy.callCount).to.equal(0);
            expect(_nodeVerifySpy.callCount).to.equal(1);
          }
        });
      });

      describe('GeneralJWS', () => {
        it('should verify BTC', async () => {
          const verified = await PayId.verify(payId, signatures.ltzcoreHD.BTC);
          expect(verified).be.true;
        });
      });

      describe('IVerifyPayId', () => {
        it('should verify BTC', async () => {
          const address = {
            address: addressBTC.addressDetails.address,
            currency: addressBTC.paymentNetwork,
            signature: signatures.ltzcoreHD.BTC.signatures[0].signature,
            protected: signatures.ltzcoreHD.BTC.signatures[0].protected,
            header: signatures.ltzcoreHD.BTC.signatures[0].header
          };
          const verified = await PayId.verify(payId, address);
          expect(verified).be.true;
        });
      });
    });
  });

  describe('sign & verify', () => {
    it('should work with Ltzcore HD key', async () => {
      const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ltzcoreHD.toString());
      expect(signed).to.exist;

      const verified = await PayId.verify(payId, signed);
      expect(verified).be.true;
    });

    it('should work with Ltzcore non-HD key', async () => {
      const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ltzcore.toString());
      expect(signed).to.exist;

      const verified = await PayId.verify(payId, signed);
      expect(verified).be.true;
    });

    it('should work with crypto-created EC key', async () => {
      const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ec.privateKey);
      expect(signed).to.exist;

      const verified = await PayId.verify(payId, signed);
      expect(verified).be.true;
    });

    it('should work with crypto-created RSA key', async () => {
      const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.rsa.privateKey);
      expect(signed).to.exist;

      const verified = await PayId.verify(payId, signed);
      expect(verified).be.true;
    });
    if (!utils.inBrowser()) {
      describe('Verify with PayId.org official utils', () => {
        const { verifySignedAddress } = require('@payid-org/utils');

        it('should verify LtzcoreHD signature created with this lib', async () => {
          const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ltzcoreHD.toString());
          const verified = verifySignedAddress(payId, signed);
          expect(verified).to.be.true;
        });

        it('should verify Ltzcore signature created with this lib', async () => {
          const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ltzcore.toString());
          const verified = verifySignedAddress(payId, signed);
          expect(verified).to.be.true;
        });

        it('should verify EC signature created with this lib', async () => {
          const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ec.privateKey);
          const verified = verifySignedAddress(payId, signed);
          expect(verified).to.be.true;
        });

        it('should verify ED25519 signature created with this lib', async () => {
          const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.ed25519.privateKey);
          const verified = verifySignedAddress(payId, signed);
          expect(verified).to.be.true;
        });

        it('should verify RSA signature created with this lib', async () => {
          const signed = await PayId.sign(payId, addressBTC.addressDetails.address, 'BTC', keys.rsa.privateKey);
          const verified = verifySignedAddress(payId, signed);
          expect(verified).to.be.true;
        });

      });
    }
  });

  describe('_convertIdentityKeyToJWK', () => {
    let _buildJWKFromLtzcore;
    beforeEach(() => {
      _buildJWKFromLtzcore = sinon.spy(PayId, '_buildJWKFromLtzcore' as any); // use 'as any' to bypass sinon's typescript restriction to public class members
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should convert Ltzcore HD private key', () => {
      const jwk = PayId['_convertIdentityKeyToJWK'](keys.ltzcoreHD.toString());
      expect(jwk).to.exist;
      expect(jwk.kty).to.equal('EC');
      expect(jwk.private).to.be.true;
      expect(_buildJWKFromLtzcore.callCount).to.equal(1);
    });

    it('should convert Ltzcore non-HD private key', () => {
      const jwk = PayId['_convertIdentityKeyToJWK'](keys.ltzcore.toString());
      expect(jwk).to.exist;
      expect(jwk.kty).to.equal('EC');
      expect(jwk.private).to.be.true;
      expect(_buildJWKFromLtzcore.callCount).to.equal(1);
    });

    it('should convert EC private key', () => {
      const jwk = PayId['_convertIdentityKeyToJWK'](keys.ec.privateKey);
      expect(jwk).to.exist;
      expect(jwk.kty).to.equal('EC');
      expect(jwk.private).to.be.true;
      expect(_buildJWKFromLtzcore.callCount).to.equal(0);
    });

    it('should convert RSA private key', () => {
      const jwk = PayId['_convertIdentityKeyToJWK'](keys.rsa.privateKey);
      expect(jwk).to.exist;
      expect(jwk.kty).to.equal('RSA');
      expect(jwk.private).to.be.true;
      expect(_buildJWKFromLtzcore.callCount).to.equal(0);
    });

    it('should fail to convert Ltzcore HD public key', () => {
      try {
        const pk = new Ltzcore.HDPublicKey(keys.ltzcoreHD);
        PayId['_convertIdentityKeyToJWK'](pk.toString());
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal(errors.REQUIRE_PRIVATE_KEY);
        expect(_buildJWKFromLtzcore.callCount).to.equal(0);
      }
    });

    it('should fail to convert Ltzcore non-HD public key', () => {
      try {
        const pk = new Ltzcore.PublicKey(keys.ltzcore);
        PayId['_convertIdentityKeyToJWK'](pk.toString());
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal(errors.REQUIRE_PRIVATE_KEY);
        expect(_buildJWKFromLtzcore.callCount).to.equal(0);
      }
    });

    it('should fail to convert EC public key', () => {
      try {
        PayId['_convertIdentityKeyToJWK'](keys.ec.publicKey);
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal(errors.REQUIRE_PRIVATE_KEY);
        expect(_buildJWKFromLtzcore.callCount).to.equal(0);
      }
    });

    it('should fail to convert RSA public key', () => {
      try {
        PayId['_convertIdentityKeyToJWK'](keys.rsa.publicKey);
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal(errors.REQUIRE_PRIVATE_KEY);
        expect(_buildJWKFromLtzcore.callCount).to.equal(0);
      }
    });

    it('should fail to convert symmetric key', () => {
      try {
        PayId['_convertIdentityKeyToJWK'](keys.sym);
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal(errors.CANNOT_PARSE_PRIVATEKEY);
        expect(_buildJWKFromLtzcore.callCount).to.equal(0);
      }
    });
  });

  describe('getThumbprint', () => {
    it('should return thumbprint', () => {
      const hex = PayId.getThumbprint(TestSignatures.payIdOrgUtils.ltzcoreHD.BTC.signatures[0].protected);
      hex.should.equal('93b533499a6040c03a0bb1ee80ef1da29483666af56a662698b2a2ecda11d54a');
    });
  });
});
