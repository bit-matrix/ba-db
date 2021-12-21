import { BmConfig, Pool } from "@bitmatrix/models";
import { PoolProvider } from "./providers/PoolProvider";
import { ConfigProvider } from "./providers/TxProviders/ConfigProvider";

export const POOLS: Pool[] = [
  {
    id: "43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd",
    quote: {
      ticker: "tL-BTC",
      name: "Liquid Testnet Bitcoin",
      asset: "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49",
      value: "0",
    },
    token: {
      ticker: "tL-USDt",
      name: "Liquid Testnet Tether",
      asset: "213cbc4df83abc230852526b1156877f60324da869f0affaee73b6a6a32ad025",
      value: "0",
    },
    lp: {
      ticker: "tL-BTC:tL-USDt:0",
      name: "Liquid Testnet LP: Bitcoin:Tether:0 Liquidty Provider",
      asset: "01f4346a807134c6dbe20801864d995b9b4c9a73063b0cd806596cd780c0af39",
      value: "0",
    },
    createdTx: {
      txid: "3d9bc4c1b203536406c129a24c3a14475d781972e4edd861eaad279358637954",
      block_hash: "721d3a1c587ad367bc8982ba9cb0e36c4136efdd1f240f286c9bc19504f3cb69",
      block_height: 131275,
    },
    unspentTx: {
      txid: "3d9bc4c1b203536406c129a24c3a14475d781972e4edd861eaad279358637954",
      block_hash: "721d3a1c587ad367bc8982ba9cb0e36c4136efdd1f240f286c9bc19504f3cb69",
      block_height: 131275,
    },
    synced: false,
    syncedBlock: {
      block_hash: "53d436a2920fb4139849258d9fa4f57344f8c6032f62918a10a5734fabe74c24",
      block_height: 131274,
    },
    recentBlockHeight: 131275,
    active: true,
  },
];

export const BM_CONFIG: BmConfig = {
  id: "",
  minRemainingSupply: "1000",
  minTokenValue: "50000000",
  baseFee: { number: "1200", hex: "" },
  serviceFee: { number: "650", hex: "" },
  commitmentTxFee: { number: "100", hex: "0000000000000064" },
  defaultOrderingFee: { number: "1", hex: "01000000" },
  fundingOutputAddress: "tex1qft5p2uhsdcdc3l2ua4ap5qqfg4pjaqlp250x7us7a8qqhrxrxfsqh7creg",
  innerPublicKey: "1dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624",
};

export const initialDatas = async (): Promise<void> => {
  const promises: Promise<void>[] = [];
  const poolProvider = await PoolProvider.getProvider();

  POOLS.forEach(async (p) => {
    promises.push(poolProvider.put(p.id, p));
    const configProvider = await ConfigProvider.getProvider(p.id);
    promises.push(configProvider.put(p.id, { ...BM_CONFIG, id: p.id }));
  });

  return Promise.all(promises).then(() => {});
};

/* const bmConfig: BmConfig = {
  id: "43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd",
  minRemainingSupply: "1000",
  minTokenValue: "50000000",
  baseFee: { number: "650", hex: "" },
  serviceFee: { number: "1200", hex: "" },
  commitmentTxFee: { number: "100", hex: "0000000000000064" },
  defaultOrderingFee: { number: "1", hex: "01000000" },
  fundingOutputAddress: "tex1qft5p2uhsdcdc3l2ua4ap5qqfg4pjaqlp250x7us7a8qqhrxrxfsqh7creg",
  innerPublicKey: "1dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624",
}; */

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
