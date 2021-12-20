import { BmConfig } from "@bitmatrix/models";
import { TxProviderBase } from "./TxProviderBase";

export class ConfigProvider {
  private static filename: string = "config";

  private txProviderBase: TxProviderBase;
  asset: string;

  private constructor(asset: string, txProviderBase: TxProviderBase) {
    this.asset = asset;
    this.txProviderBase = txProviderBase;
  }

  public static getProvider = async (asset: string): Promise<ConfigProvider> => {
    const txProviderBase = await TxProviderBase.getProvider(asset, ConfigProvider.filename);
    const instance = new ConfigProvider(asset, txProviderBase);
    return instance;
  };

  get = async (key: string): Promise<BmConfig | undefined> => this.txProviderBase.get<BmConfig>(this.asset + "__" + ConfigProvider.filename, key);
  put = async (key: string, value: BmConfig): Promise<void> => this.txProviderBase.put<BmConfig>(this.asset + "__" + ConfigProvider.filename, key, value);
  getMany = async (limit = 10, reverse = true): Promise<BmConfig[]> => {
    const result = await this.txProviderBase.getMany<BmConfig>(this.asset + "__" + ConfigProvider.filename, limit, reverse);
    return result.map((r) => r.val) || [];
  };
  clear = async (): Promise<void> => this.txProviderBase.deleteAll(this.asset + "__" + ConfigProvider.filename);
}
