# Ltzcore



  <p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/ltzcore-lib">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/bitpay/ltzcore">
  <a href="https://opensource.org/licenses/MIT/" target="_blank"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-blue.svg" style="display: inherit;"/></a>
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/bitpay/ltzcore">
  <br>
 <img src="https://circleci.com/gh/bitpay/ltzcore.svg?style=shield" alt="master build">
</p>
  
  
  
**Infrastructure to build Bitcoin and blockchain-based applications for the next generation of financial technology.**

## Getting Started

### Requirements

- Trusted P2P Peer
- MongoDB Server >= v3.4
- make g++ gcc 

### Checkout the repo


```sh
git clone git@github.com:bitpay/ltzcore.git
git checkout master
npm install
```

## Setup Guide

### 1. Setup Ltzcore config

<details>
<summary>Example ltzcore.config.json</summary>
<br>

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
      },
      "BCH": {
        "mainnet": {
          "parentChain": "BTC",
          "forkHeight": 478558,
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 30008
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 30009,
            "username": "username",
            "password": "password"
          }
        },
        "regtest": {
          "chainSource": "p2p",
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 30020
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 30021,
            "username": "username",
            "password": "password"
          }
        }
      }
    }
  }
}
```

</details>

### 2. Setup Bitcoin Node

<details>
<summary>Example Bitcoin Mainnet Config</summary>

```sh
whitelist=127.0.0.1
txindex=0
listen=1
server=1
irc=1
upnp=1

# Make sure port & rpcport matches the
# ltzcore.config.json ports for BTC mainnet

# if using Bitcoin Core v0.17+ prefix
# [main]

port=20008
rpcport=20009
rpcallowip=127.0.0.1

rpcuser=username
rpcpassword=password
```

</details>

### 3. Run Bitcoin node

<details>
<summary>Example Starting a Bitcoin Node</summary>

```sh
# Path to your bitcoin application and path to the config above
/Applications/Bitcoin-Qt.app/Contents/MacOS/Bitcoin-Qt -datadir=/Users/username/blockchains/bitcoin-core/networks/mainnet/
```

</details>

### 4. Start Ltzcore

```sh
npm run node
```

## Applications

- [Ltzcore Node](packages/ltzcore-node) - A full node with extended capabilities using Bitcoin Core
- [Ltzcore Wallet](packages/ltzcore-wallet) - A command-line based wallet client
- [Ltzcore Wallet Client](packages/ltzcore-wallet-client) - A client for the wallet service
- [Ltzcore Wallet Service](packages/ltzcore-wallet-service) - A multisig HD service for wallets
- [Bitpay Wallet](https://github.com/bitpay/copay) - An easy-to-use, multiplatform, multisignature, secure bitcoin wallet
- [Insight](packages/insight) - A blockchain explorer web user interface

## Libraries

- [Ltzcore Channel](https://github.com/bitpay/ltzcore-channel) - Micropayment channels for rapidly adjusting bitcoin transactions
- [Ltzcore ECIES](https://github.com/bitpay/ltzcore-ecies) - Uses ECIES symmetric key negotiation from public keys to encrypt arbitrarily long data streams
- [Ltzcore Lib](packages/ltzcore-lib) - A pure and powerful JavaScript Bitcoin library
- [Ltzcore Lib Cash](packages/ltzcore-lib-cash) - A pure and powerful JavaScript Bitcoin Cash library
- [Ltzcore Message](https://github.com/bitpay/ltzcore-message) - Bitcoin message verification and signing
- [Ltzcore Mnemonic](packages/ltzcore-mnemonic) - Implements mnemonic code for generating deterministic keys
- [Ltzcore P2P](packages/ltzcore-p2p) - The peer-to-peer networking protocol for BTC
- [Ltzcore P2P Cash](packages/ltzcore-p2p-cash) - The peer-to-peer networking protocol for BCH
- [Crypto Wallet Core](packages/crypto-wallet-core) - A coin-agnostic wallet library for creating transactions, signing, and address derivation

## Extras

- [Ltzcore Build](packages/ltzcore-build) - A helper to add tasks to gulp
- [Ltzcore Client](packages/ltzcore-client) - A helper to create a wallet using the ltzcore-v8 infrastructure

## Contributing

See [CONTRIBUTING.md](https://github.com/bitpay/ltzcore/blob/master/Contributing.md) on the main ltzcore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/bitpay/ltzcore/blob/master/LICENSE).

Copyright 2013-2019 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
