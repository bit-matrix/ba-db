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
  recipientValueMinus: 1000000,
  mainCovenantScript:
    "7e7e7e7e7e7c20b31c041f160a87565a71071dc957418b8a021244f284d070bb49962ba00f7adb1b20766b6b6351b27500c8696c876700c8696c87916960b27521ac68201dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624105461704c6561662f656c656d656e747311546170547765616b2f656c656d656e747300c869557988cd5388d45688d5588853c9696b51c9696b52c9696b006b04ffffff7f6b567a766e6e6eaa7654c70100880401000000888855c7010088040200000088888202a201885180528855517f5288012a557f0500ffffffff880153557f0500ffffffff880158517f5488028400547f04516a4c4e88028800014e7f76012080567988760120517f7c76012101217f7c760142587f7c014a547fe2e1577976518000c8697e51795101187f7e54797e7c0119527f7e5679a8767e01c47e015c7e7c7ea85579a8767e58797e7c7ea85a7a54ca697654ca69887e7c5879e46c6c5279936b51797651a2696ea0636d678854c76d588052c76d5880dd6968527aa954d100888854c86953c869886c6c6c6c00cb54cb88567a765487916355ce6953ce698855cf690800000000000000008855d14f88036a01ffa88868765187637554c96902b004567993e0d8697602e803e0df69766b55c86953c8698855c969028a02e0887602f401e0da6977d8695179d76960e0da6977517960e0da697753790380841ee0da6977d9697cda69770380841ee0d96952797cd8690340420fe0d869567a5179dd637654ce6951c8698854cf69887c6cd769527a527ad8697c6754ce6953c869886c54cf6988756867765287637554c96902b0045679028a029393e08855c86951c8698855c969760480f0fa02e0df69766b7602f401e0da6977d8695279d7690380841ee0da6977517960e0da697753790380841ee0da6977d9697cda697760e0d96951797cd869567a5179dd637654ce6953c8698854cf6988d869517a6cd7697c6754ce6951c869886c54cf6988756867765387637554c96902b0045679028a029393e0d8697602e803e0df697660e0da69770400943577e05579d869766bd969527960e0da6977da697755c86951c8698855c969760480f0fa02e0df69760380841ee0da69776cd96955790380841ee0da6977da6977527a6edf637767756852c86954ce69887654cf6988557a7cd869547a527ad769537a537ad769557a7567765487637554c96902b0045679028a029393e08855c86952c8698855c969766b517960e0da6977d9690400943577e05479d869766bda697760e0d9697654cf69886c6c766b54790380841ee0da6977d9697cda69770380841ee0d9697655ce6951ce698855cf69886c557ad769547a527ad869537a537ad869557a75676a686868686b6b6b6b6b6d6d756c756ce051e002b004e0d969d76953e0da69777652e0d96951e0d9690120e0da6977d769d58c767676cf69547a88d14f8800a888ce6953ce69888c76d1008814972ca4efa6bac21a771259e77dafabeeb0acbfe088ce6953ce69886c52cf69886c51cf69886c53cf698800ca6900d1698851ca6951d1698852ca6952d1698853ca6953d1698800c86900ce698851c86951ce698852c86952ce698853c86953ce6988d2040200000088d304000000008721c41dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624",
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
