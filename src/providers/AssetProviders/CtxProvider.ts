import { CommitmentTx } from "../../models/CommitmentTx";
import { AssetProviderBase } from "./AssetProviderBase";

export class CtxProvider {
  private static filename: string = "ctx";

  private assetProvider: AssetProviderBase;
  asset: string;

  private constructor(asset: string, assetProvider: AssetProviderBase) {
    this.asset = asset;
    this.assetProvider = assetProvider;
  }

  public static getProvider = async (asset: string): Promise<CtxProvider> => {
    const assetProvider = await AssetProviderBase.getProvider(asset, CtxProvider.filename);
    const instance = new CtxProvider(asset, assetProvider);
    return instance;
  };

  get = async (key: string): Promise<CommitmentTx | undefined> => this.assetProvider.get<CommitmentTx>(this.asset + "__" + CtxProvider.filename, key);
  put = async (key: string, value: CommitmentTx): Promise<void> => this.assetProvider.put<CommitmentTx>(this.asset + "__" + CtxProvider.filename, key, value);
  getMany = async (limit = 10, reverse = true): Promise<CommitmentTx[]> => {
    const result = await this.assetProvider.getMany<CommitmentTx>(this.asset + "__" + CtxProvider.filename, limit, reverse);
    return result.map((r) => r.val) || [];
  };
}
