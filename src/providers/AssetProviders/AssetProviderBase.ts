import rocksdb from "rocksdb";
import { DATA_DIR } from "../../env";
import { RocksDbProvider } from "./../RocksDbProvider";

export class AssetProviderBase {
  private static baseProviders: { assetFile: string; _dbProvider: RocksDbProvider; _provider: AssetProviderBase }[] = [];

  private constructor() {}

  public static getProvider = async (asset: string, filename: string): Promise<AssetProviderBase> => {
    const assetFile = asset + "__" + filename;
    let baseProvider = AssetProviderBase.baseProviders.find((p) => p.assetFile === assetFile);

    if (baseProvider === undefined) {
      const db = rocksdb(DATA_DIR + assetFile);

      const openPromise = new Promise<void>((resolve, reject) => {
        db.open({ createIfMissing: true, errorIfExists: false }, (err) => {
          if (err) {
            console.error("AssetProviderBase.constructor.db.open.error", err);
            reject(err);
          }
          resolve();
        });
      });
      await openPromise;

      baseProvider = { assetFile, _dbProvider: new RocksDbProvider(db), _provider: new AssetProviderBase() };
      AssetProviderBase.baseProviders.push(baseProvider);
    }

    return baseProvider._provider;
  };

  get = async <T>(assetFile: string, key: string): Promise<T | undefined> => {
    let baseProvider = AssetProviderBase.baseProviders.find((p) => p.assetFile === assetFile);
    if (baseProvider) {
      return baseProvider._dbProvider.get<T>(key);
    }
    throw new Error("asset file not found..");
  };

  del = async (assetFile: string, key: string): Promise<void> => {
    let baseProvider = AssetProviderBase.baseProviders.find((p) => p.assetFile === assetFile);
    if (baseProvider) {
      return baseProvider._dbProvider.del(key);
    }
    throw new Error("asset file not found..");
  };

  put = async <T>(assetFile: string, key: string, value: T): Promise<void> => {
    let baseProvider = AssetProviderBase.baseProviders.find((p) => p.assetFile === assetFile);
    if (baseProvider) {
      return baseProvider._dbProvider.put<T>(key, value);
    }
    throw new Error("asset file not found..");
  };

  getMany = async <T>(assetFile: string, limit = 10, reverse = true): Promise<{ key: string; val: T }[]> => {
    let baseProvider = AssetProviderBase.baseProviders.find((p) => p.assetFile === assetFile);
    if (baseProvider) {
      return baseProvider._dbProvider.getMany<T>(limit, reverse);
    }
    throw new Error("asset file not found..");
  };
}
