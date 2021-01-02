
import { expect } from 'chai';
import { Validation } from '../src';

describe('Address Validation', () => {
  // BTC
  const btcAddress = '1NuKwkDtCymgA1FNLUBaUWLD8s4kdKWvgn';
  const btcTestAddress = 'mkUNMewkQsHKRcUvv5HLKbqmepCqNH8goc';

  // Uri
  const btcUri = 'bitcoin:1NuKwkDtCymgA1FNLUBaUWLD8s4kdKWvgn';
  const btcTestUri = 'bitcoin:mkUNMewkQsHKRcUvv5HLKbqmepCqNH8goc';

  // Invalid Address
  const invalidBtcAddress = '1NuKwkDtCymgA1FNLUBaUWLD8s4kKWvgn';

  it('should be able to validate an BTC address', async () => {
    const isValidAddress = await Validation.validateAddress('BTC', 'mainnet', btcAddress);
    const isValidTestAddress = await Validation.validateAddress('BTC', 'testnet', btcTestAddress);
    expect(isValidAddress).to.equal(true);
    expect(isValidTestAddress).to.equal(true);
  });

  it('should be able to validate an BTC Uri', async () => {
    const isValidUri = await Validation.validateUri('BTC', btcUri);
    const isValidTestUri = await Validation.validateUri('BTC', btcTestUri);
    expect(isValidUri).to.equal(true);
    expect(isValidTestUri).to.equal(true);
  });

  it('should be able to invalidate an incorrect BTC address', async () => {
    const inValidAddress = await Validation.validateAddress('BTC', 'mainnet', invalidBtcAddress);
    expect(inValidAddress).to.equal(false);
  });
});
