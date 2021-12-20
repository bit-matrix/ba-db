import { BmCtxNew } from "@bitmatrix/models";
import { TxProviderBase } from "./TxProviderBase";

export class CtxNewProvider {
  private static filename: string = "ctx_new";

  private txProviderBase: TxProviderBase;
  asset: string;

  private constructor(asset: string, txProviderBase: TxProviderBase) {
    this.asset = asset;
    this.txProviderBase = txProviderBase;
  }

  public static getProvider = async (asset: string): Promise<CtxNewProvider> => {
    const txProviderBase = await TxProviderBase.getProvider(asset, CtxNewProvider.filename);
    const instance = new CtxNewProvider(asset, txProviderBase);
    return instance;
  };

  get = async (key: string): Promise<BmCtxNew | undefined> => this.txProviderBase.get<BmCtxNew>(this.asset + "__" + CtxNewProvider.filename, key);
  put = async (key: string, value: BmCtxNew): Promise<void> => this.txProviderBase.put<BmCtxNew>(this.asset + "__" + CtxNewProvider.filename, key, value);
  del = async (key: string): Promise<void> => this.txProviderBase.del(this.asset + "__" + CtxNewProvider.filename, key);
  getMany = async (limit = 10, reverse = true): Promise<BmCtxNew[]> => {
    const result = await this.txProviderBase.getMany<BmCtxNew>(this.asset + "__" + CtxNewProvider.filename, limit, reverse);
    return result.map((r) => r.val) || [];
  };
  clear = async (): Promise<void> => this.txProviderBase.deleteAll(this.asset + "__" + CtxNewProvider.filename);
}
