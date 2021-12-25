import { BmBlockInfo, BmConfig, BmTxInfo, Pool } from "@bitmatrix/models";
import { PoolProvider } from "./providers/PoolProvider";
import { ConfigProvider } from "./providers/TxProviders/ConfigProvider";

const initialPoolBlock: BmBlockInfo = {
  block_hash: "0eae90b7d8815f284c36ac5999e99eb8dc42a8e6b0a72f681f36d91ff28d3941",
  block_height: 140252,
};

const initialPoolTx: BmTxInfo = {
  txid: "95b3df28abdc5b30fe0a31cfe78bdf7e3dc102ecf61928007212caff0a386367",
  ...initialPoolBlock,
};

export const POOLS: Pool[] = [
  {
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
  },
  // {
  /**
   * pool assets, values
   */
  //   id: "e1ed34f4be34f90408f008c32f932e2b7ebfbfab64ed3e925aab8b635cba5c16",
  //   quote: {
  //     ticker: "tL-BTC",
  //     name: "Liquid Testnet Bitcoin",
  //     asset: "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49",
  //     value: "1000020000",
  //   },
  //   token: {
  //     ticker: "tL-USDt",
  //     name: "Liquid Testnet Tether",
  //     asset: "58caa32446839c6befe7bcf483c72d27a92c45429b55ff6f42b3c0a9726aa19e",
  //     value: "49999001000000",
  //   },
  //   lp: {
  //     ticker: "tL-BTC:tL-USDt:0",
  //     name: "Liquid Testnet LP: Bitcoin:Tether:0 Liquidty Provider",
  //     asset: "772c8f2d8a5426cdc2a483f75b3fc317b67c599f8c8741b90539db48bf47a0f4",
  //     value: "1999990000",
  //   },

  /**
   * pool creation tx info
   */
  //  initialTx: initialPoolTx,

  /**
   * last worker checked block info
   */
  //  lastSyncedBlock: initialPoolBlock,

  /**
   * recent block height on network
   */
  //  bestBlockHeight: 0,

  /**
   * lastSyncedBlock.height === bestBlockHeight
   * (if true worker can create pool tx else pass creation pool tx)
   */
  //  synced: false,

  /**
   * recent worker found pool tx (it may be spent, validate "synced")
   */
  //  unspentTx: undefined,

  /**
   * if worker broadcast one tx, save here.
   * when it confirmed (worker found new ptx is equal to this), delete for new creation pool tx
   */
  // lastSentPtx: undefined,

  /**
   * pool is active
   */
  //  active: true,
  // },
  /* {
    id: "43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd",
    quote: {
      ticker: "tL-BTC",
      name: "Liquid Testnet Bitcoin",
      asset: "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49",
      value: "1005000",
    },
    token: {
      ticker: "tL-USDt",
      name: "Liquid Testnet Tether",
      asset: "213cbc4df83abc230852526b1156877f60324da869f0affaee73b6a6a32ad025",
      value: "49753000000",
    },
    lp: {
      ticker: "tL-BTC:tL-USDt:0",
      name: "Liquid Testnet LP: Bitcoin:Tether:0 Liquidty Provider",
      asset: "01f4346a807134c6dbe20801864d995b9b4c9a73063b0cd806596cd780c0af39",
      value: "1999990000",
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
      block_height: 132675,
    },
    // last unspent ctx: 132677
    // last unspent ptx: 131275

    recentBlockHeight: 131275,
    active: true,
  }, */
];

export const BM_CONFIG: BmConfig = {
  id: "",
  minRemainingSupply: 1000,
  minTokenValue: 50000000,
  baseFee: { number: 1200, hex: "" },
  serviceFee: { number: 650, hex: "" },
  commitmentTxFee: { number: 100, hex: "0000000000000064" },
  defaultOrderingFee: { number: 1, hex: "01000000" },
  fundingOutputAddress: "tex1qft5p2uhsdcdc3l2ua4ap5qqfg4pjaqlp250x7us7a8qqhrxrxfsqh7creg",
  innerPublicKey: "1dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624",
};

export const initialDatas = async (lastSyncedBlockHeight?: number): Promise<void> => {
  const promises: Promise<void>[] = [];
  const poolProvider = await PoolProvider.getProvider();

  POOLS.forEach(async (p) => {
    const lsbh = lastSyncedBlockHeight === undefined ? p.lastSyncedBlock.block_height : lastSyncedBlockHeight;
    promises.push(poolProvider.put(p.id, { ...p, lastSyncedBlock: { ...p.lastSyncedBlock, block_height: lsbh } }));
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
