import { BmCtxMempool } from "@bitmatrix/models";
import { TxProviderBase } from "./TxProviderBase";

export class CtxMempoolProvider {
  private static filename: string = "ctx_mempool";

  private txProviderBase: TxProviderBase;
  asset: string;

  private constructor(asset: string, txProviderBase: TxProviderBase) {
    this.asset = asset;
    this.txProviderBase = txProviderBase;
  }

  public static getProvider = async (asset: string): Promise<CtxMempoolProvider> => {
    const txProviderBase = await TxProviderBase.getProvider(asset, CtxMempoolProvider.filename);
    const instance = new CtxMempoolProvider(asset, txProviderBase);
    return instance;
  };

  get = async (key: string): Promise<BmCtxMempool | undefined> => this.txProviderBase.get<BmCtxMempool>(this.asset + "__" + CtxMempoolProvider.filename, key);
  put = async (key: string, value: BmCtxMempool): Promise<void> => this.txProviderBase.put<BmCtxMempool>(this.asset + "__" + CtxMempoolProvider.filename, key, value);
  del = async (key: string): Promise<void> => this.txProviderBase.del(this.asset + "__" + CtxMempoolProvider.filename, key);
  getMany = async (limit = 10, reverse = true): Promise<BmCtxMempool[]> => {
    const result = await this.txProviderBase.getMany<BmCtxMempool>(this.asset + "__" + CtxMempoolProvider.filename, limit, reverse);
    return result.map((r) => r.val) || [];
  };
  clear = async (): Promise<void> => this.txProviderBase.deleteAll(this.asset + "__" + CtxMempoolProvider.filename);
}
