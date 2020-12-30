# Ltzcore PayID

This is a library to assist [PayId](https://payid.org/) integration with Ltzcore

## Setup
> npm install

## Usage

### Sign
* Ltzcore key
```javascript
import Ltzcore from 'ltzcore-lib';
import PayId from 'ltzcore-payid';

// ...

const privKey = new Ltzcore.HDPrivateKey(); // or Ltzcore.PrivateKey() for a non-hierarchically derived private key

const signed = await PayId.sign('alex$example.com', 'bitcoinaddress123', 'BTC', privKey.toString());
```

* Node crypto key
```javascript
import crypto from 'crypto';
import PayId from 'ltzcore-payid';

// ...

const keys = crypto.generateKeyPair('ec'); // could be 'rsa' too
const privKey = keys.privateKey.export({ format: 'pem', type: 'pkcs8' });

const signed = await PayId.sign('alex$example.com', 'bitcoinaddress123', 'BTC', privKey);
```

* From file

```javascript
import fs from 'fs';
import PayId from 'ltzcore-payid';

// ...

const privKey = fs.readFileSync('/path/to/private/key');

const signed = await PayId.sign('alex$example.com', 'bitcoinaddress123', 'BTC', privKey);
```

It is recommended to store the signed.signatures' `signatures` and `protected` properties. `protected` can be thought of as the public key to verify the signature because it contains the ingredients to build the public key as a JWK, but you could also discard the `protected` property if you intend to rebuild it at verification time.


### Verify

`verifiableAddress` can be manually constructed as a `IVerifyPayId` object or a `JWK.GeneralJWS` object from the [jose](https://www.npmjs.com/package/jose) library. Note that the ltzcore-payid `sign` method above returns a JWK.GeneralJWS object.

```javascript
import PayId from 'PayId';

// ...

const isValid = await PayId.verify('alice$example.com', verifiableAddress);
```

