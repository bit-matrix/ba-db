import { Pool } from "./models/Pool";

export const POOLS: Pool[] = [
  {
    asset: "43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd",
    quote: { ticker: "L-BTC", name: "Liquid Bitcoin" },
    token: { ticker: "USDt", name: "Tether USD" },
    active: true,
  },
];

/**
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
 * "asset_ctx_active_[Pool.asset]"  // { key : blockHash, val: CommitmentTx[] } -- found and unspend ctxs
 * "asset_ctx_[Pool.asset]"  // { key : blockHash, val: CommitmentTx[] } -- found all ctxs history, will update when spend (when remove from asset_ctx_active_[Pool.asset])
 * "asset_ptx_[Pool.asset]"  // { key : blockHash, val: PoolTx[] } -- found all ptxs (may save which ctx spend with this tx?)
 *
 *
 *
 */
