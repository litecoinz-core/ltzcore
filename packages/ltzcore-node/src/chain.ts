module.exports = {
  BTC: {
    lib: require('ltzcore-lib'),
    p2p: require('ltzcore-p2p')
  },
  BCH: {
    lib: require('ltzcore-lib-cash'),
    p2p: require('ltzcore-p2p-cash')
  }
};
