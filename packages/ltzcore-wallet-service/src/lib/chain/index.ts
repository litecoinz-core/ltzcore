import { ITxProposal, IWallet, TxProposal } from '../model';
import { WalletService } from '../server';
import { BtcChain } from './btc';

const Common = require('../common');
const Constants = Common.Constants;

export interface INotificationData {
  out: {
    address: any;
    amount: any;
  };
  txid: any;
}

export interface IChain {
  getWalletBalance(server: WalletService, wallet: IWallet, opts: { coin: string; addresses: string[] } & any, cb);
  getWalletSendMaxInfo(
    server: WalletService,
    wallet: IWallet,
    opts: { excludeUnconfirmedUtxos: string; returnInputs: string; from: string; feePerKb: number } & any,
    cb
  );
  getDustAmountValue();
  getTransactionCount(server: WalletService, wallet: IWallet, from: string);
  getChangeAddress(server: WalletService, wallet: IWallet, opts: { changeAddress: string } & any);
  checkDust(output: { amount: number; toAddress: string; valid: boolean }, opts: { outputs: any[] } & any);
  getFee(server: WalletService, wallet: IWallet, opts: { fee: number; feePerKb: number } & any);
  getLtzcoreTx(txp: TxProposal, opts: { signed: boolean });
  convertFeePerKb(p: number, feePerKb: number);
  checkTx(server: WalletService, txp: ITxProposal);
  checkTxUTXOs(server: WalletService, txp: ITxProposal, opts: {} & any, cb);
  selectTxInputs(server: WalletService, txp: ITxProposal, wallet: IWallet, opts: { utxosToExclude: any[] } & any, cb);
  checkUtxos(opts: { fee: number; inputs: any[] });
  checkValidTxAmount(output): boolean;
  isUTXOCoin(): boolean;
  isSingleAddress(): boolean;
  supportsMultisig(): boolean;
  notifyConfirmations(network: string): boolean;
  addSignaturesToLtzcoreTx(
    tx: string,
    inputs: any[],
    inputPaths: any[],
    signatures: any[],
    xpub: string,
    signingMethod?: string
  );
  addressToStorageTransform(network: string, address: {}): void;
  addressFromStorageTransform(network: string, address: {}): void;
  validateAddress(wallet: IWallet, inaddr: string, opts: {} & any);
  onCoin(coin: any): INotificationData | null;
  onTx(tx: any): INotificationData | null;
}

const chain: { [chain: string]: IChain } = {
  BTC: new BtcChain()
};

class ChainProxy {
  get(coin: string) {
    const normalizedChain = this.getChain(coin);
    return chain[normalizedChain];
  }

  getChain(coin: string): string {
    return coin.toUpperCase();
  }

  getWalletBalance(server, wallet, opts, cb) {
    return this.get(wallet.coin).getWalletBalance(server, wallet, opts, cb);
  }

  getWalletSendMaxInfo(server, wallet, opts, cb) {
    return this.get(wallet.coin).getWalletSendMaxInfo(server, wallet, opts, cb);
  }

  getDustAmountValue(coin) {
    return this.get(coin).getDustAmountValue();
  }

  getTransactionCount(server, wallet, from) {
    return this.get(wallet.coin).getTransactionCount(server, wallet, from);
  }

  getChangeAddress(server, wallet, opts) {
    return this.get(wallet.coin).getChangeAddress(server, wallet, opts);
  }

  checkDust(coin, output, opts) {
    return this.get(coin).checkDust(output, opts);
  }

  getFee(server, wallet, opts) {
    return this.get(wallet.coin).getFee(server, wallet, opts);
  }

  getLtzcoreTx(txp: TxProposal, opts = { signed: true }) {
    return this.get(txp.coin).getLtzcoreTx(txp, { signed: opts.signed });
  }

  convertFeePerKb(coin, p, feePerKb) {
    return this.get(coin).convertFeePerKb(p, feePerKb);
  }

  addressToStorageTransform(coin, network, address) {
    return this.get(coin).addressToStorageTransform(network, address);
  }

  addressFromStorageTransform(coin, network, address) {
    return this.get(coin).addressFromStorageTransform(network, address);
  }

  checkTx(server, txp) {
    return this.get(txp.coin).checkTx(server, txp);
  }

  checkTxUTXOs(server, txp, opts, cb) {
    return this.get(txp.coin).checkTxUTXOs(server, txp, opts, cb);
  }

  selectTxInputs(server, txp, wallet, opts, cb) {
    return this.get(txp.coin).selectTxInputs(server, txp, wallet, opts, cb);
  }

  checkUtxos(coin, opts) {
    return this.get(coin).checkUtxos(opts);
  }

  checkValidTxAmount(coin: string, output): boolean {
    return this.get(coin).checkValidTxAmount(output);
  }

  isUTXOCoin(coin: string): boolean {
    return this.get(coin).isUTXOCoin();
  }

  isSingleAddress(coin: string): boolean {
    return this.get(coin).isSingleAddress();
  }

  notifyConfirmations(coin: string, network: string): boolean {
    return this.get(coin).notifyConfirmations(network);
  }

  supportsMultisig(coin: string): boolean {
    return this.get(coin).supportsMultisig();
  }

  addSignaturesToLtzcoreTx(coin, tx, inputs, inputPaths, signatures, xpub, signingMethod) {
    this.get(coin).addSignaturesToLtzcoreTx(tx, inputs, inputPaths, signatures, xpub, signingMethod);
  }

  validateAddress(wallet, inaddr, opts) {
    return this.get(wallet.coin).validateAddress(wallet, inaddr, opts);
  }

  onCoin(coin: string, coinData: any) {
    return this.get(coin).onCoin(coinData);
  }

  onTx(coin: string, tx: any) {
    return this.get(coin).onTx(tx);
  }
}

export let ChainService = new ChainProxy();
