import { expect } from 'chai';
import { Transactions } from '../src';

describe('Transaction Creation', () => {
  it('should create a BTC tx', () => {
    const recipients = [{ address: 'mpNpzMoprLnSBu8CWDunNCYeJq3Mzdk59V', amount: 1e8 }];
    const change = 'msnAsQcCdtzDyiSWb4ZnNxFwUy3P9ogQvY';
    const utxos = [
      {
        mintTxid: '643ec66d6c4cad4cbdb8ed2166b8078975e0af9bb7ff7e30d394f43b0d9f18ab',
        mintIndex: 1,
        value: 0.02503422 * 1e8,
        script: '76a91457884dcfe2ab46d3354a42d97333c95e5b80cf0188ac',
        address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5',
        sequenceNumber: 4294967294
      },
      {
        mintTxid: '643ec66d6c4cad4cbdb8ed2166b8078975e0af9bb7ff7e30d394f43b0d9f18ab',
        mintIndex: 0,
        value: 1e8,
        script: '76a9144e744a19a009a9dd43a23a7c12045c83e82ac9d288ac',
        address: 'mnfnJx2xWWptYmBzck3rdE851Dtu9GaZ3F',
        sequenceNumber: 4294967294
      }
    ];
    const fee = 7440;
    const tx = Transactions.create({ chain: 'BTC', recipients, change, utxos, fee, rbf: true });

    const keys = [
      {
        address: 'mnfnJx2xWWptYmBzck3rdE851Dtu9GaZ3F',
        privKey: 'cSFjiifSbZ2hU4jTFwE993LCe2rkZGULCTGWTDWXzHvuXRKxpnc1'
      },
      { address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5', privKey: 'cUWVirwp5vh1D6WWbYci3tuGniyf28ERpgU4uL5VSiFDfvNEhJqy' }
    ];
    const signed = Transactions.sign({ chain: 'BTC', tx, keys, utxos });
    const expected =
      '0200000002ab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e64010000006a47304402202eeb967801c0aad4f8241d8f90e2a9e2236f95c189165ba6b2ba4dc6b17bacbe02201b5d4dc0c32f6aa134d93698f85bf4c098d15fcbaada0b6ca2b8076fd8aa2741012102c8f8fa438666cbd287e28fb384b99555e4acce610e8141e887c9c458bba5db5cffffffffab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e64000000006a473044022072bdde2c0b413fc42d15d93e768a26f818dc5b225b9359235c09fd0452d6121a022007c00afa396d60d5b7919f2ba31e638817561cab4e2afed7a86dd636ee293c1001210321f2f13aed42db7257b64f77d574071a6e81e460ab3693eefb7482c12d1ff697ffffffff0200e1f505000000001976a914612fb4d5e27a28f5c54018d8948ca3a650741c4188acee152600000000001976a91486823ef7c8e210184cc8675189d37c4c9d8e1e0288ac00000000';
    expect(signed).to.eq(expected);
  });

  it('should sign a BTC opreturn tx', () => {
    const tx =
      '0200000001ab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e640100000000ffffffff0200000000000000000b6a096a07696f6e3a61626340420f00000000001976a91457884dcfe2ab46d3354a42d97333c95e5b80cf0188ac00000000';
    const utxos = [
      {
        mintTxid: '643ec66d6c4cad4cbdb8ed2166b8078975e0af9bb7ff7e30d394f43b0d9f18ab',
        mintIndex: 1,
        value: 0.02503422 * 1e8,
        script: '76a91457884dcfe2ab46d3354a42d97333c95e5b80cf0188ac',
        address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5',
        sequenceNumber: 4294967294
      }
    ];
    const keys = [
      {
        address: 'mnfnJx2xWWptYmBzck3rdE851Dtu9GaZ3F',
        privKey: 'cSFjiifSbZ2hU4jTFwE993LCe2rkZGULCTGWTDWXzHvuXRKxpnc1'
      },
      { address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5', privKey: 'cUWVirwp5vh1D6WWbYci3tuGniyf28ERpgU4uL5VSiFDfvNEhJqy' }
    ];
    const signed = Transactions.sign({ chain: 'BTC', tx, keys, utxos });
    const expected =
      '0200000001ab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e64010000006b483045022100a3e6e04d311930ec19b11033e77d973ae37181ead6b2db582ec1c21028c469350220602faacf6f6753b271571452e4597205971ab1d790e60080d50c206c8c327f86012102c8f8fa438666cbd287e28fb384b99555e4acce610e8141e887c9c458bba5db5cffffffff0200000000000000000b6a096a07696f6e3a61626340420f00000000001976a91457884dcfe2ab46d3354a42d97333c95e5b80cf0188ac00000000';
    expect(signed).to.eq(expected);
  });

  it.skip('should fail to get signatures on a BTC txs', () => {
    // TODO !!
  });
});
