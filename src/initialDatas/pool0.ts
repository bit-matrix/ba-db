import { BmBlockInfo, BmConfig, BmTxInfo, Pool } from "@bitmatrix/models";

// db7a0fa02b9649bb70d084f24412028a8b4157c91d07715a56870a161f041cb3
const initialPoolBlock: BmBlockInfo = {
  block_hash: "0eae90b7d8815f284c36ac5999e99eb8dc42a8e6b0a72f681f36d91ff28d3941",
  block_height: 140252,
};
const initialPoolTx: BmTxInfo = {
  txid: "95b3df28abdc5b30fe0a31cfe78bdf7e3dc102ecf61928007212caff0a386367",
  ...initialPoolBlock,
};

const pool: Pool = {
  /**
   * pool assets, values
   */
  id: "db7a0fa02b9649bb70d084f24412028a8b4157c91d07715a56870a161f041cb3",
  quote: {
    ticker: "tL-BTC",
    name: "Liquid Testnet Bitcoin",
    asset: "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49",
    value: "1000000000",
  },
  token: {
    ticker: "tL-USDt",
    name: "Liquid Testnet Tether",
    asset: "f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958",
    value: "50000000000000",
  },
  lp: {
    ticker: "tL-BTC:tL-USDt:0",
    name: "Liquid Testnet LP: Bitcoin:Tether:0 Liquidty Provider",
    asset: "867a7ebf9dc4f33f3773e46f7315cdd3faf848bf63aca4d1d30e7628d3f62a98",
    value: "1999990000",
  },

  /**
   * pool creation tx info
   */
  initialTx: initialPoolTx,

  /**
   * last worker checked block info
   */
  lastSyncedBlock: initialPoolBlock,

  /**
   * recent block height on network
   */
  bestBlockHeight: 0,

  /**
   * lastSyncedBlock.height === bestBlockHeight
   * (if true worker can create pool tx else pass creation pool tx)
   */
  synced: false,

  /**
   * recent worker found pool tx (it may be spent, validate "synced")
   */
  unspentTx: undefined,

  /**
   * if worker broadcast one tx, save here.
   * when it confirmed (worker found new ptx is equal to this), delete for new creation pool tx
   */
  lastSentPtx: undefined,

  /**
   * pool is active
   */
  active: true,
};

const config: BmConfig = {
  id: "db7a0fa02b9649bb70d084f24412028a8b4157c91d07715a56870a161f041cb3",
  minRemainingSupply: 1000,
  minTokenValue: 50000000,
  baseFee: { number: 1200, hex: "" },
  serviceFee: { number: 650, hex: "" },
  commitmentTxFee: { number: 100, hex: "0000000000000064" },
  defaultOrderingFee: { number: 1, hex: "01000000" },
  fundingOutputAddress: "tex1qft5p2uhsdcdc3l2ua4ap5qqfg4pjaqlp250x7us7a8qqhrxrxfsqh7creg",
  innerPublicKey: "1dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624",
};

export const pool0 = { pool, config };

/**
 *
 *
 * ### STAGE 0 ###
 *
 *    1. PUT (create)
 *    pools
 * value: Pool = {
 *   id: string;
 *   quote: PAsset;
 *   token: PAsset;
 *   lp: PAsset;
 *   createdTx: BmTxInfo;
 *   unspentTx: BmTxInfo;
 *   synced: boolean;
 *   syncedBlock: BmBlockInfo;
 *   recentBlock: BmBlockInfo;
 *   active: boolean;
 * }
 * key: value.id
 *
 *
 *
 *  ### STAGE 1 ###
 *
 *    1. PUT (create)
 *    ctx_new
 * value: BmCtx = {
 *   callData: CallData;
 *   commitmentTx: BmTxInfo;
 * }
 * key: value.commitmentTx.txid
 *
 *
 *
 *  ### STAGE 2 ###
 *
 *    1. PUT (create)
 *    ctx_mempool
 * value: BmCtxMempool = {
 *   callData: CallData;
 *   commitmentTx: BmTxInfo;
 *   poolTxid: string;
 * }
 * key: value.commitmentTx.txid
 *
 *    2. PUT (create)
 *    ptx_ctx
 * value: BmPtxCtx;
 * key: value.poolTxid
 *
 *
 *  ### STAGE 3 ###
 *
 *    1. PUT (create)
 *    ptx
 * value: BmPtx = {
 *   callData: CallData;
 *   commitmentTx: BmTxInfo;
 *   poolTx: BmTxInfo;
 * }
 * key: value.commitmentTx.txid
 *
 *    2. DEL (delete)
 *    ctx_mempool
 * key value..commitmentTx.txid
 *
 *
 */
