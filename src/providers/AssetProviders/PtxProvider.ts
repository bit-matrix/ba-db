import { PoolTx } from "../../models/PoolTx";
import { AssetProviderBase } from "./AssetProviderBase";

export class PtxProvider {
  private static filename: string = "ptx";

  private assetProvider: AssetProviderBase;
  asset: string;

  private constructor(asset: string, assetProvider: AssetProviderBase) {
    this.asset = asset;
    this.assetProvider = assetProvider;
  }

  public static getProvider = async (asset: string): Promise<PtxProvider> => {
    const assetProvider = await AssetProviderBase.getProvider(asset, PtxProvider.filename);
    const instance = new PtxProvider(asset, assetProvider);
    return instance;
  };

  get = async (key: string): Promise<PoolTx | undefined> => this.assetProvider.get<PoolTx>(this.asset + "__" + PtxProvider.filename, key);
  put = async (key: string, value: PoolTx): Promise<void> => this.assetProvider.put<PoolTx>(this.asset + "__" + PtxProvider.filename, key, value);
  getMany = async (limit = 10, reverse = true): Promise<PoolTx[]> => {
    const result = await this.assetProvider.getMany<PoolTx>(this.asset + "__" + PtxProvider.filename, limit, reverse);
    return result.map((r) => r.val) || [];
  };
  clear = async (): Promise<void> => this.assetProvider.deleteAll(this.asset + "__" + PtxProvider.filename);
}
