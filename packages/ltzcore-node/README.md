# Ltzcore Node

**A full node with extended capabilities using Bitcoin Core.**

## Setup Guide

### Example ltzcore.config.json

Set up your ltzcore.config.json file in ./ltzcore

```json
{
  "ltzcoreNode": {
    "chains": {
      "BTC": {
        "mainnet": {
          "chainSource": "p2p",
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 20008
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 20009,
            "username": "username",
            "password": "password"
          }
        },
        "regtest": {
          "chainSource": "p2p",
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 20020
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 20021,
            "username": "username",
            "password": "password"
          }
        }
      }
    }
  }
}
```

Then start the node

```sh
npm run node
```

## API Documentation

- [REST API parameters and example responses](./docs/api-documentation.md)

- [Websockets API namespaces, event names and parameters](./docs/sockets-api.md)

- [Testing Ltzcore-node in RegTest](./docs/wallet-guide.md)

## Contributing

See [CONTRIBUTING.md](../../Contributing.md) on the main ltzcore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/bitpay/ltzcore/blob/master/LICENSE).

Copyright 2013-2019 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
