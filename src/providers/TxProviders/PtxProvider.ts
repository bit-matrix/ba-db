import { BmPtx } from "@bitmatrix/models";
import { TxProviderBase } from "./TxProviderBase";

export class PtxProvider {
  private static filename: string = "ptx";

  private txProviderBase: TxProviderBase;
  asset: string;

  private constructor(asset: string, txProviderBase: TxProviderBase) {
    this.asset = asset;
    this.txProviderBase = txProviderBase;
  }

  public static getProvider = async (asset: string): Promise<PtxProvider> => {
    const txProviderBase = await TxProviderBase.getProvider(asset, PtxProvider.filename);
    const instance = new PtxProvider(asset, txProviderBase);
    return instance;
  };

  get = async (key: string): Promise<BmPtx | undefined> => this.txProviderBase.get<BmPtx>(this.asset + "__" + PtxProvider.filename, key);
  put = async (key: string, value: BmPtx): Promise<void> => this.txProviderBase.put<BmPtx>(this.asset + "__" + PtxProvider.filename, key, value);
  getMany = async (limit = 10, reverse = true): Promise<BmPtx[]> => {
    const result = await this.txProviderBase.getMany<BmPtx>(this.asset + "__" + PtxProvider.filename, limit, reverse);
    return result.map((r) => r.val) || [];
  };
  clear = async (): Promise<void> => this.txProviderBase.deleteAll(this.asset + "__" + PtxProvider.filename);
}
