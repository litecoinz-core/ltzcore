# Modules
Modules are loaded before services are started. This allows code to hook into services and register classes, event handlers, etc that alter the behaviors of services.

## Example - Syncing BCH
Let's say we have a node_module, named `ltzcore-node-bch` with the following code

```
// index.js

module.exports = class BitcoinCashModule {
  constructor(services) {
    services.Libs.register('BCH', 'ltzcore-lib-cash', 'ltzcore-p2p-cash');
    services.P2P.register('BCH', services.P2P.get('BTC'));
  }
}
```

The module has the following dependencies
```
// package.json

  "dependencies": {
    "ltzcore-lib-cash": "^8.3.4",
    "ltzcore-p2p-cash": "^8.3.4"
  }

```

We could add this module by adding `ltzcore-node-bch` to the modules array in ltzcore.config.json

```
    modules: ['./bitcoin', 'ltzcore-node-bch'],
```
