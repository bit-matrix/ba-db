import { BmPtxCtx } from "@bitmatrix/models";
import { TxProviderBase } from "./TxProviderBase";

export class PtxCtxProvider {
  private static filename: string = "ptx_ctx";

  private txProviderBase: TxProviderBase;
  asset: string;

  private constructor(asset: string, txProviderBase: TxProviderBase) {
    this.asset = asset;
    this.txProviderBase = txProviderBase;
  }

  public static getProvider = async (asset: string): Promise<PtxCtxProvider> => {
    const txProviderBase = await TxProviderBase.getProvider(asset, PtxCtxProvider.filename);
    const instance = new PtxCtxProvider(asset, txProviderBase);
    return instance;
  };

  get = async (key: string): Promise<BmPtxCtx | undefined> => this.txProviderBase.get<BmPtxCtx>(this.asset + "__" + PtxCtxProvider.filename, key);
  put = async (key: string, value: BmPtxCtx): Promise<void> => this.txProviderBase.put<BmPtxCtx>(this.asset + "__" + PtxCtxProvider.filename, key, value);
  getMany = async (limit = 10, reverse = true): Promise<BmPtxCtx[]> => {
    const result = await this.txProviderBase.getMany<BmPtxCtx>(this.asset + "__" + PtxCtxProvider.filename, limit, reverse);
    return result.map((r) => r.val) || [];
  };
  clear = async (): Promise<void> => this.txProviderBase.deleteAll(this.asset + "__" + PtxCtxProvider.filename);
}
