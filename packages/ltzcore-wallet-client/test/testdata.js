
var exports = {}

exports.history = [{
  txid: "0279ef7b21630f859deb723e28beac9e7011660bd1346c2da40321d2f7e34f04",
  vin: [{
    txid: "c8e221141e8bb60977896561b77fa59d6dacfcc10db82bf6f5f923048b11c70d",
    vout: 0,
    n: 0,
    addr: "2N6Zutg26LEC4iYVxi7SHhopVLP1iZPU1rZ",
    valueSat: 485645,
    value: 0.00485645,
  }, {
    txid: "6e599eea3e2898b91087eb87e041c5d8dec5362447a8efba185ed593f6dc64c0",
    vout: 1,
    n: 1,
    addr: "2MyqmcWjmVxW8i39wdk1CVPdEqKyFSY9H1S",
    valueSat: 885590,
    value: 0.0088559,
  }],
  vout: [{
    value: "0.00045753",
    n: 0,
    scriptPubKey: {
      addresses: [
        "2NAVFnsHqy5JvqDJydbHPx393LFqFFBQ89V"
      ]
    },
  }, {
    value: "0.01300000",
    n: 1,
    scriptPubKey: {
      addresses: [
        "mq4D3Va5mYHohMEHrgHNGzCjKhBKvuEhPE"
      ]
    }
  }],
  time: 1424471041,
  blocktime: 20,
  valueOut: 0.01345753,
  valueIn: 0.01371235,
  fees: 0.00025482
}, {
  txid: "fad88682ccd2ff34cac6f7355fe9ecd8addd9ef167e3788455972010e0d9d0de",
  vin: [{
    txid: "0279ef7b21630f859deb723e28beac9e7011660bd1346c2da40321d2f7e34f04",
    vout: 0,
    n: 0,
    addr: "2NAVFnsHqy5JvqDJydbHPx393LFqFFBQ89V",
    valueSat: 45753,
    value: 0.00045753,
  }],
  vout: [{
    value: "0.00011454",
    n: 0,
    scriptPubKey: {
      addresses: [
        "2N7GT7XaN637eBFMmeczton2aZz5rfRdZso"
      ]
    }
  }, {
    value: "0.00020000",
    n: 1,
    scriptPubKey: {
      addresses: [
        "mq4D3Va5mYHohMEHrgHNGzCjKhBKvuEhPE"
      ]
    }
  }],
  firstSeenTs: 1424472242,
  blocktime: 10,
  valueOut: 0.00031454,
  valueIn: 0.00045753,
  fees: 0.00014299
}];



exports.payProJsonBody = body = {
  btc: '{"network":"main","currency":"BTC","requiredFeeRate":27.001,"outputs":[{"amount":1004800,"address":"1MR4ucgpxum2iPYCixX77Qi9rR4im3ccsx"}],"time":"2019-03-08T15:27:43.684Z","expires":"2019-03-08T15:42:43.684Z","memo":"Payment request for BitPay invoice 4Zrpank3aA2EAdYaQwMXbz for merchant Electronic Frontier Foundation","paymentUrl":"https://bitpay.com/i/4Zrpank3aA2EAdYaQwMXbz","paymentId":"4Zrpank3aA2EAdYaQwMXbz"}',
};

exports.payProJson = {
  'btc': {
    body:  Buffer.from(body.btc),
    headers: {
      'x-identity': '1EMqSoDzMdBuuvM2RUnup3FnDeo6wuHxEg',
      signature: '8eb262abc4333eef8286f1bebcebb364bb240113319e85c106f9499d813c94337af0104362798d77f57baf8f1fc04723a69c7eaa66e308fb2ac0386873fd1ef9',
      digest: 'SHA-256=6f49d6fe37d7a8049dcb804d05f4a0c0ad0c7e50f12cd17a792a76e975b62a06',
        'x-signature-type': 'ecc',
    },
  }
};
exports.payProJsonV2Body = bodyV2 = {
  btc: '{"time":"2019-11-05T15:21:09.047Z","expires":"2019-11-05T15:36:09.047Z","memo":"Payment request for BitPay invoice LanynqCPoL2JQb8z8s5Z3X for merchant BitPay Visa® Load (USD-USA)","paymentUrl":"https://bitpay.com/i/LanynqCPoL2JQb8z8s5Z3X","paymentId":"LanynqCPoL2JQb8z8s5Z3X","chain":"BTC","network":"main","instructions":[{"type":"transaction","requiredFeeRate":34.337,"outputs":[{"amount":19800,"address":"1CpEMwff6DA52FLoq4JAhd2xFSEjQxyokm"}]}]}'
};

exports.payProJsonV2 = {
  'btc': {
    body:  Buffer.from(bodyV2.btc),
    headers: {
      'x-identity': '1DbY94wCcLRM1Y6RGFg457JyqBbsYxzfiN',
      signature: '61e74de80655486d11490baa2da96bac8d2f7332b349e7de869f451fe80fb8892ecb69d48bc8d19ee96396bf0c7aeeaffcd84538cd96e600567499ab99f1d7ac',
      digest: 'SHA-256=11d2c9d7f4ff8a843f567c3ce0982201252c78f7d29501fadfffed68aa49c6c9',
      'x-signature-type': 'ecc'
    },
  }
};

module.exports = exports;
