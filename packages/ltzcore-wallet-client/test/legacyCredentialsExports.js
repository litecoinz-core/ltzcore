
let x = [
  {
    name: 'btc11b44',
    blob: '{"coin":"btc","network":"testnet","xPrivKey":"tprv8ZgxMBicQKsPdG9XcQ3VH5eN9mSnHD7SbJEZkXmiQuMpjtNqnba1b643y8mH8WjFCJPj2Jjyy2U79Nayd48NoGgCjTx9BPbDLzkQjFGitty","xPubKey":"tpubDCfpUXTQ1tkXgPnEa7nkHEpCWXVeiNcxRZoijFzJ8AcS82UZg9afcLnokD6BwuXoVp6V5jWxfkbXbYYJJeb3fKBNu27ckJa7e5pTwmHxySV","requestPrivKey":"b521ed60246e57edec2c93d4494add7677e1eaa3a849d696bec00147dbb69906","requestPubKey":"03cf496bc2d10c815fe48106e3ebbb43bf027f69532e815f0d604339d91a152b21","copayerId":"7d60a4f031130647aaa80bde0515609745a5819808a6295cc23b9a38a9c707f5","publicKeyRing":[{"xPubKey":"tpubDCfpUXTQ1tkXgPnEa7nkHEpCWXVeiNcxRZoijFzJ8AcS82UZg9afcLnokD6BwuXoVp6V5jWxfkbXbYYJJeb3fKBNu27ckJa7e5pTwmHxySV","requestPubKey":"03cf496bc2d10c815fe48106e3ebbb43bf027f69532e815f0d604339d91a152b21"}],"walletId":"c0d8267c-2375-4229-abb0-7461c71afebb","walletName":"mywallet","m":1,"n":1,"walletPrivKey":"f84fa68481a2f12e0a7b7d37a926434b7febe6f3f40773bfff653998c50a5c75","personalEncryptingKey":"BpWi1ss+i1C1ZxUiLiU5sA==","sharedEncryptingKey":"idK9yGqoNSQ71Cng0GUB6A==","copayerName":"creator","mnemonic":"peace market error couch drift pizza nose sunset total buffalo piece liberty","entropySource":"a1140d313e20412771266186176dc9db29fd103681f83fcc26a4aa6eedaffbaa","mnemonicHasPassphrase":false,"derivationStrategy":"BIP44","account":0,"compliantDerivation":true,"addressType":"P2PKH"}',
    test: {
      key: {
        xPrivKey: 'tprv8ZgxMBicQKsPdG9XcQ3VH5eN9mSnHD7SbJEZkXmiQuMpjtNqnba1b643y8mH8WjFCJPj2Jjyy2U79Nayd48NoGgCjTx9BPbDLzkQjFGitty',

        // FALSE because this is a 1-1 wallet. 
        // new multisig wallet should use 48'
        use44forMultisig: false,
        compliantDerivation: true,
              BIP45: false,
      },
      credentials: {
        coin: 'btc',
        network: 'testnet',
        account: 0,
        rootPath: 'm/44\'/1\'/0\'',
      }
    },
    name: 'btc11b44e',
    blob: JSON.stringify({"coin":"btc","network":"testnet","xPrivKeyEncrypted":"{\"iv\":\"jBiIFQ2SgH12vEZkb+dDbw==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"WXncRtIR9qU=\",\"ct\":\"nQmvBl3GllfFefkVECfRDVruuT3ci4j4gJ4k++80ilt9KqA8A5X4xxD5VuiwomlDEPAsmbt2EaoKze0X1XKJv40tRsNtstWA64UJdavj2+2bCj4Al1ju8WZg0nAtMFgU9MauBlJf8xFI+51KtLdLo2FQn57raCQ=\"}","xPubKey":"tpubDDFg8eGNJxaEKeLvwQDaSbBBmAC6JkftteQbbnjiTYuSvBg3tLUE4QoimhhsYtuDQG78M4XQR77qDVRKDdXnb3paCWhQigrVr3uhsVXAoZ1","requestPrivKey":"78f85fd5c87766b5a5446f4ef32a236c3175fd7d638ff75c07ca2d46e8f29a96","requestPubKey":"035d8249cb1ee9e688074b18724aa4b22f392846c920fe11f50fd537658a2170ad","copayerId":"0d4782acb7740307dd60f3a04b06b5bc6f01f9eebb80aaedbbe5bb437cc95f1d","publicKeyRing":[{"xPubKey":"tpubDDFg8eGNJxaEKeLvwQDaSbBBmAC6JkftteQbbnjiTYuSvBg3tLUE4QoimhhsYtuDQG78M4XQR77qDVRKDdXnb3paCWhQigrVr3uhsVXAoZ1","requestPubKey":"035d8249cb1ee9e688074b18724aa4b22f392846c920fe11f50fd537658a2170ad"}],"walletId":"874b69b3-5f2f-4c97-aefd-35c0b26bc72a","walletName":"mywallet","m":1,"n":1,"walletPrivKey":"e93d1a8f152985846e21fb4f9f5fbb74bbecc7c00ee97ada469c899df29bd79d","personalEncryptingKey":"9T1NN62mI4jLBxEYr3DA7A==","sharedEncryptingKey":"07qBAxYTcpghPfcMjODcXA==","copayerName":"creator","mnemonicEncrypted":"{\"iv\":\"pxoyl8AKHcvXZbB/GPd7yg==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"WXncRtIR9qU=\",\"ct\":\"pIsQzm/wzdtUkFrHQaOTzczMSAdP7jh0ljJ8iASzJWIRdH63c2+yF44Z/F3vmOktdWqwUXbav82wjURoCItT3pI7iQ5s2DhB9Z5XmWh+9xa8I0+2Bg==\"}","entropySource":"3a24a0f43177049f60829d7d4096e45359488b7f0c9d8ad82a1466204f94a0f8","mnemonicHasPassphrase":false,"derivationStrategy":"BIP44","account":0,"compliantDerivation":true,"addressType":"P2PKH"}),
    test: {
      key: {
        xPrivKeyEncrypted: '{"iv":"jBiIFQ2SgH12vEZkb+dDbw==","v":1,"iter":10000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"WXncRtIR9qU=","ct":"nQmvBl3GllfFefkVECfRDVruuT3ci4j4gJ4k++80ilt9KqA8A5X4xxD5VuiwomlDEPAsmbt2EaoKze0X1XKJv40tRsNtstWA64UJdavj2+2bCj4Al1ju8WZg0nAtMFgU9MauBlJf8xFI+51KtLdLo2FQn57raCQ="}',
        use44forMultisig: false,
        compliantDerivation: true,
              BIP45: false,
      },
      credentials: {
        coin: 'btc',
        network: 'testnet',
        account: 0,
        rootPath: 'm/44\'/1\'/0\'',
      }
    },
  }, {
    name: 'btc22b44e',
    blob: JSON.stringify({"coin":"btc","network":"testnet","xPrivKeyEncrypted":"{\"iv\":\"WP3FP98hFcGIky57JVAHTQ==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"yJFdLdWTujc=\",\"ct\":\"x70kUzaGow28Etfzcg7JHXmdcK3NlPUG+/LALSnOVVkY+qMyR4sdICJvqAxNGTkKM6/kbePDV9+ZkqJpCHR4bmR9JK/oH2qWgTHZJYxb9O+JOQX0quX0ASUEVIsmE8MgDpwFyEsMp5lBaZdaM3KOSW4prESz2pc=\"}","xPubKey":"tpubDDh1yV1S6vCoJyFoR2pY2icHHshwySLVc5bcbuAfhG3w1iUEqRvquEff9iH5Xb8sM4UB6G4MUHmg6NUxxbn7VDnmE1yfJ2rwSodaiZ6DT43","requestPrivKey":"70201a46c89c2bc634bf3cb693a55ec500fc7daf51c50b545263d0a4f3712494","requestPubKey":"03381414ec1ca5f04b4ec44061593664520910607f742d22f84a5c6b97cd942484","copayerId":"4b750ce00fb627d62189f8fd1fd9cabf3ed7f5717e3d67cbe492c4e15ed3a062","publicKeyRing":[{"xPubKey":"tpubDDh1yV1S6vCoJyFoR2pY2icHHshwySLVc5bcbuAfhG3w1iUEqRvquEff9iH5Xb8sM4UB6G4MUHmg6NUxxbn7VDnmE1yfJ2rwSodaiZ6DT43","requestPubKey":"03381414ec1ca5f04b4ec44061593664520910607f742d22f84a5c6b97cd942484"}],"walletId":"ee952eed-e5bd-491b-8ef7-0929b6ff59aa","walletName":"mywallet","m":2,"n":2,"walletPrivKey":"e0975db7e1993887815e2984f92cddf56b8ddc018e0beef23ae4bcf5f59b9fc6","personalEncryptingKey":"8mDYpEQIstQTlBKRrSqojA==","sharedEncryptingKey":"EWzAG50Tl6NDX87xy+Y2VA==","copayerName":"creator","mnemonicEncrypted":"{\"iv\":\"vTLJc0YnYTKNvGVIkIAZyA==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"yJFdLdWTujc=\",\"ct\":\"Pp0hTR151Ct60/r9dPfLaerADczijn32/0ulzE+ZEdfl9jrLQRmtP5FMdx0BPG8vdZALJ9RUMburNXXv1z6QBuloIAnuu8L3AAYO5eco\"}","entropySource":"1dff1c55270353a0a469f652576fbd7002d324faca4b59ae421aaa6c242bd9a3","mnemonicHasPassphrase":false,"derivationStrategy":"BIP44","account":0,"compliantDerivation":true,"addressType":"P2SH"}),
    test: {
      key: {
        xPrivKeyEncrypted: JSON.stringify(JSON.parse('{\"iv\":\"WP3FP98hFcGIky57JVAHTQ==\",\"v\":1,\"iter\":10000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"yJFdLdWTujc=\",\"ct\":\"x70kUzaGow28Etfzcg7JHXmdcK3NlPUG+/LALSnOVVkY+qMyR4sdICJvqAxNGTkKM6/kbePDV9+ZkqJpCHR4bmR9JK/oH2qWgTHZJYxb9O+JOQX0quX0ASUEVIsmE8MgDpwFyEsMp5lBaZdaM3KOSW4prESz2pc=\"}')),
        use44forMultisig: true,
        compliantDerivation: true,
              BIP45: false,
      },
      credentials: {
        coin: 'btc',
        network: 'testnet',
        account: 0,
        rootPath: 'm/44\'/1\'/0\'',
      }
    },
  }, {
    name: 'btc45',
    blob: JSON.stringify({"coin":"btc","network":"testnet","xPrivKey":"tprv8ZgxMBicQKsPdAYhtd2RKsiMCKBKZfTqgTQp8aSFnE8UaHWdHEeWkX4ruppk5mUJNvbQddBs72qy6AdxzUS6jrXap9vrwHttwAgscY7WHJM","xPubKey":"tpubD9SH8gKTWgxWMMzZKcXLVoyNbw67bfrwxr3yXEJv66jXvRFCQ6hCaV438An9zYNMWN6CbxvV9HmAHUpHtbxmYz2KncBTut5JWM3VHLQLHEp","requestPrivKey":"806ef1863cd031c5a69c4d86943e3fb0af18c9150e5f24be244c0d97432fc831","requestPubKey":"021dc46507b5bb3e197a1afdfb1f2de3e53f64bf78595da408a0f27dbbb8a72041","copayerId":"626b8281414d7e2330d8f8ca265af0269350c860f6e121d83179b192252338c7","publicKeyRing":[{"xPubKey":"tpubD9SH8gKTWgxWMMzZKcXLVoyNbw67bfrwxr3yXEJv66jXvRFCQ6hCaV438An9zYNMWN6CbxvV9HmAHUpHtbxmYz2KncBTut5JWM3VHLQLHEp","requestPubKey":"021dc46507b5bb3e197a1afdfb1f2de3e53f64bf78595da408a0f27dbbb8a72041"}],"walletId":"02261d7a-5be8-4513-b657-c14fe3f30c13","walletName":"Unopauno","m":1,"n":1,"walletPrivKey":"e6b299550eb97c19599329bd3a3f9d2f670915b5f22a4f9f4ef41bccc7806b38","personalEncryptingKey":"HlsjOme+PsNvhnNk452ZwA==","sharedEncryptingKey":"n+lDtNlDXEAHLPmx3quz0g==","copayerName":"me","derivationStrategy":"BIP45","account":0,"addressType":"P2SH"}),
    test: {
            key: {
        xPrivKey: 'tprv8ZgxMBicQKsPdAYhtd2RKsiMCKBKZfTqgTQp8aSFnE8UaHWdHEeWkX4ruppk5mUJNvbQddBs72qy6AdxzUS6jrXap9vrwHttwAgscY7WHJM',
        use44forMultisig: false,
        compliantDerivation: true,
              BIP45: true,
      },
      credentials: {
        coin: 'btc',
        network: 'testnet',
        account: 0,
        rootPath: 'm/45\'',
      }
    },
  },
  {
    name: 'btc44ro',
    blob: JSON.stringify({"coin":"btc","network":"testnet","xPubKey":"tpubDDspVdLhVHT2fCQ4egsQTNQkEJV7xWR5X1qkiKHQziRVyz325Hvhhvdh5RFNJdAg1uuSjsfLDdPg1jrNcjeHUoQq1ADtBe1JJ77U7YFTWFu","requestPrivKey":"29016f64a8e852dd04dcac04baa6d914c1c3b0a9215f32816df517eb9b4fb437","requestPubKey":"036b370f47009c63b73a678b8e5bc6f1eb0f7657fd19550c3e62fd0d5ae7be0e77","copayerId":"f02bdff36efae4c948ac3891c33a1316fff2a7ff0e2b6e414484e928f544812d","publicKeyRing":[{"xPubKey":"tpubDDspVdLhVHT2fCQ4egsQTNQkEJV7xWR5X1qkiKHQziRVyz325Hvhhvdh5RFNJdAg1uuSjsfLDdPg1jrNcjeHUoQq1ADtBe1JJ77U7YFTWFu","requestPubKey":"036b370f47009c63b73a678b8e5bc6f1eb0f7657fd19550c3e62fd0d5ae7be0e77","copayerName":"me"}],"walletId":"d92370cc-5a64-4077-af78-12a4231ca54e","walletName":"Prueba","m":1,"n":1,"walletPrivKey":"8fa948b6424da0c020a48ed9089d580afa2bece4b987157b2234420d34de04e7","personalEncryptingKey":"xXo6iM/9Ff9JWy53cwZY+A==","sharedEncryptingKey":"8o+VGScR2LrIX6z0h/i04A==","copayerName":"me","entropySource":"379ee24c7a214646a475d1f8d6cd479200a1cce62116807b180394424713afc7","mnemonicHasPassphrase":false,"derivationStrategy":"BIP44","account":0,"compliantDerivation":true,"addressType":"P2PKH"}),
    test: {
      key: false, 
      credentials: { xPubKey: 'tpubDDspVdLhVHT2fCQ4egsQTNQkEJV7xWR5X1qkiKHQziRVyz325Hvhhvdh5RFNJdAg1uuSjsfLDdPg1jrNcjeHUoQq1ADtBe1JJ77U7YFTWFu'}
    },
  }
];

module.exports =x;
