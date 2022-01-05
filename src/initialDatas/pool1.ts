import { BmBlockInfo, BmConfig, BmTxInfo, Pool } from "@bitmatrix/models";

// ece73cb2f0b240dd6772898215ead8266383dafb76672e9d6bbbdcd772a55a5f
const initialPoolBlock: BmBlockInfo = {
  block_hash: "172a1ea725befea83a0df45a496d7b20c8835a88bba66411ff8947122d98e403",
  block_height: 158700,
};
const initialPoolTx: BmTxInfo = {
  txid: "59b526820dfb4254c8a9255407b5a21f89957b535948bbf3a7ac7006ffaebe9e",
  ...initialPoolBlock,
};

const pool: Pool = {
  /**
   * pool assets, values
   */
  id: "ece73cb2f0b240dd6772898215ead8266383dafb76672e9d6bbbdcd772a55a5f",
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
    name: "Liquid Testnet LP: Bitcoin:Tether:1 Liquidty Provider",
    asset: "a769764493aff9b65d639cd2ff331a471fc478076cf3e4d3f6737b900d26abb3",
    value: "1990000000",
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
  id: "ece73cb2f0b240dd6772898215ead8266383dafb76672e9d6bbbdcd772a55a5f",
  minRemainingSupply: 1000,
  minTokenValue: 50000000,
  baseFee: { number: 700, hex: "" },
  serviceFee: { number: 650, hex: "" },
  commitmentTxFee: { number: 100, hex: "0000000000000064" },
  defaultOrderingFee: { number: 1, hex: "01000000" },
  fundingOutputAddress: "tex1qft5p2uhsdcdc3l2ua4ap5qqfg4pjaqlp250x7us7a8qqhrxrxfsqh7creg",
  innerPublicKey: "1dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624",
  recipientValueMinus: 3000000,
};

export const pool1 = { pool, config };

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
