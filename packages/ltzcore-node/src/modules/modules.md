# Modules
Modules are loaded before services are started. This allows code to hook into services and register classes, event handlers, etc that alter the behaviors of services.

## Example - Syncing BTC
Let's say we have a node_module, named `ltzcore-node` with the following code

```
// index.js

module.exports = class BitcoinModule {
  constructor(services) {
    services.Libs.register('BTC', 'ltzcore-lib', 'ltzcore-p2p');
    services.P2P.register('BTC', services.P2P.get('BTC'));
  }
}
```

The module has the following dependencies
```
// package.json

  "dependencies": {
    "ltzcore-lib": "^8.23.1",
    "ltzcore-p2p": "^8.23.1"
  }

```

We could add this module by adding `ltzcore-node` to the modules array in ltzcore.config.json

```
    modules: ['./bitcoin', 'ltzcore-node'],
```
