import { CommitmentTx } from "../../models/CommitmentTx";
import { AssetProviderBase } from "./AssetProviderBase";

export class CtxActiveProvider {
  private static filename: string = "ctx_active";

  private assetProvider: AssetProviderBase;
  asset: string;

  private constructor(asset: string, assetProvider: AssetProviderBase) {
    this.asset = asset;
    this.assetProvider = assetProvider;
  }

  public static getProvider = async (asset: string): Promise<CtxActiveProvider> => {
    const assetProvider = await AssetProviderBase.getProvider(asset, CtxActiveProvider.filename);
    const instance = new CtxActiveProvider(asset, assetProvider);
    return instance;
  };

  get = async (key: string): Promise<CommitmentTx | undefined> => this.assetProvider.get<CommitmentTx>(this.asset + "__" + CtxActiveProvider.filename, key);
  put = async (key: string, value: CommitmentTx): Promise<void> => {
    // filter unspent txs
    const unspentTxs = value.txs.filter((tx) => tx.spendTxId === "");

    // if all ctxs of block spent, del this data from active table
    if (unspentTxs.length === 0) return this.assetProvider.del(this.asset + "__" + CtxActiveProvider.filename, key);

    // has unspent txs, add or update it
    return this.assetProvider.put<CommitmentTx>(this.asset + "__" + CtxActiveProvider.filename, key, { ...value, txs: unspentTxs });
  };
  getMany = async (limit = 10, reverse = true): Promise<CommitmentTx[]> => {
    const result = await this.assetProvider.getMany<CommitmentTx>(this.asset + "__" + CtxActiveProvider.filename, limit, reverse);
    return result.map((r) => r.val) || [];
  };
  clear = async (): Promise<void> => this.assetProvider.deleteAll(this.asset + "__" + CtxActiveProvider.filename);
}
