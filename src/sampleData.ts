import { Pool } from "./models/Pool";
import { AssetBlockheight } from "./models/AssetBlockheight";
import { CommitmentTx } from "./models/CommitmentTx";
import { CommitmentTxData } from "./models/CommitmentTxData";
import { CALL_METHOD } from "./models/CALL_METHOD";
import { PoolTx } from "./models/PoolTx";

const sample_CommitmentTxData: CommitmentTxData = {
  CALL_METHOD: CALL_METHOD.SWAP_QUOTE_FOR_TOKEN,
  RECIPIENT_PUBLIC_KEY: "",
  SLIPPAGE_TOLERANCE: "",
  ORDERING_FEE: 0,
  SATOSHI_VALUE: 0,
  TOKEN_VALUE: 0,
  LP_VALUE: 0,
};
/*
 * one file name: "pools"
 * datas for each POOLS:
 * "pools" // { key: Pool.asset, val: Pool }
 */
const pool_SAMPLE: { key: string; val: Pool }[] = [
  {
    key: "43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd",
    val: {
      asset: "43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd",
      quote: { ticker: "L-BTC", name: "Liquid Bitcoin" },
      token: { ticker: "USDt", name: "Tether USD" },
      active: true,
    },
  },
];

/**
 * one file name: "asset_blockheight"
 * datas for each POOLS:
 * "asset_blockheight"  // { key : Pool.asset + ":CTX" | Pool.asset + ":PTX", val: AssetBlockheight }
 * last checked block info for commitment txs for sync
 * last checked block info for pool txs for sync
 */
const asset_blockheight_SAMPLE: { key: string; val: AssetBlockheight }[] = [
  { key: "43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd" + ":CTX", val: { block_height: 123, block_hash: "a1a1a1a1a1a1a1a1aa1a1a1a1a1a1a1a1aa1a1a" } },
  { key: "43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd" + ":PTX", val: { block_height: 123, block_hash: "a1a1a1a1a1a1a1a1aa1a1a1a1a1a1a1a1aa1a1a" } },
];

/**
 * 3 files for each POOLS
 * tx datas of each block (if found)
 * "asset_ctx_active_[Pool.asset]"  // { key : blockHash, val: AssetBlockheight } -- found and unspend ctxs
 * "asset_ctx_[Pool.asset]"  // { key : blockHash, val: AssetBlockheight } -- found all ctxs history, will update when spend (when remove from asset_ctx_active_[Pool.asset])
 * "asset_ptx_[Pool.asset]"  // { key : blockHash, val: AssetBlockheight } -- found all ptxs (may save which ctx spend with this tx?)
 */
const asset_ctx_active_43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd: { key: string; val: CommitmentTx[] }[] = [
  { key: "a1a1a1a1a1a1a1a1aa1a1a1a1a1a1a1a1aa1a1a", val: [{ block_hash: "", block_height: 0, txs: [{ txid: "", data: sample_CommitmentTxData, spendTxId: "" }] }] },
  { key: "b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2", val: [{ block_hash: "", block_height: 0, txs: [{ txid: "", data: sample_CommitmentTxData, spendTxId: "" }] }] },
];
const asset_ctx_43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd: { key: string; val: CommitmentTx[] }[] = [
  { key: "a1a1a1a1a1a1a1a1aa1a1a1a1a1a1a1a1aa1a1a", val: [{ block_hash: "", block_height: 0, txs: [{ txid: "", data: sample_CommitmentTxData, spendTxId: "" }] }] },
  { key: "b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2", val: [{ block_hash: "", block_height: 0, txs: [{ txid: "", data: sample_CommitmentTxData, spendTxId: "" }] }] },
  { key: "c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3", val: [{ block_hash: "", block_height: 0, txs: [{ txid: "", data: sample_CommitmentTxData, spendTxId: "cccccccccccccc" }] }] },
  { key: "d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4", val: [{ block_hash: "", block_height: 0, txs: [{ txid: "", data: sample_CommitmentTxData, spendTxId: "bbbbbbbbbbbbbb" }] }] },
];
const asset_ptx_43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd: { key: string; val: PoolTx[] }[] = [
  {
    key: "8989898989898989898989898989898989898989",
    val: [
      {
        block_hash: "",
        block_height: 0,
        txs: [
          {
            txid: "",
            commitmentTx: { block_hash: "", block_height: 0, txs: [{ txid: "", data: sample_CommitmentTxData, spendTxId: "bbbbbbbbbbbbbb" }] },
          },
        ],
      },
    ],
  },
  /* { key: "7878787878787878787878787878787878787878", val: {} },
  { key: "6767676767676767676767676767676767676767", val: {} },
  { key: "5656565656565656565656565656565656565656", val: {} }, */
];

/**
 *
 * Files
 *
 * one file.
 * datas for each POOLS:
 * "pools" // { key: Pool.asset, val: Pool }
 *
 * one file.
 * datas for each POOLS:
 * "asset_blockheight"  // { key : Pool.asset + ":CTX" | Pool.asset + ":PTX", val: AssetBlockheight }
 *
 * 3 files for each POOLS
 * tx datas of each block (if found)
 * "asset_ctx_active_[Pool.asset]"  // { key : blockHash, val: AssetBlockheight } -- found and unspend ctxs
 * "asset_ctx_[Pool.asset]"  // { key : blockHash, val: AssetBlockheight } -- found all ctxs history, will update when spend (when remove from asset_ctx_active_[Pool.asset])
 * "asset_ptx_[Pool.asset]"  // { key : blockHash, val: AssetBlockheight } -- found all ptxs (may save which ctx spend with this tx?)
 *
 *
 *
 */
