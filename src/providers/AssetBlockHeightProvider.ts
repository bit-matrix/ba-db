import rocksdb from "rocksdb";
import { DATA_DIR } from "../env";
import { AssetBlockheight } from "../models/AssetBlockheight";
import { RocksDbProvider } from "./RocksDbProvider";

export class AssetBlockHeightProvider {
  private static location: string = DATA_DIR + "asset_blockheight";
  private static _dbProvider: RocksDbProvider;
  private static _provider: AssetBlockHeightProvider;
  private constructor() {}

  public static getProvider = async (): Promise<AssetBlockHeightProvider> => {
    if (AssetBlockHeightProvider._provider === undefined) {
      const db = rocksdb(AssetBlockHeightProvider.location);

      const openPromise = new Promise<void>((resolve, reject) => {
        db.open({ createIfMissing: true, errorIfExists: false }, (err) => {
          if (err) {
            console.error("BaseProvider.constructor.db.open.error", err);
            reject(err);
          }
          resolve();
        });
      });
      await openPromise;

      AssetBlockHeightProvider._dbProvider = new RocksDbProvider(db);
      AssetBlockHeightProvider._provider = new AssetBlockHeightProvider();
    }
    return AssetBlockHeightProvider._provider;
  };

  get = async (key: string): Promise<AssetBlockheight | undefined> => AssetBlockHeightProvider._dbProvider.get<AssetBlockheight>(key);
  put = async (key: string, value: AssetBlockheight): Promise<void> => AssetBlockHeightProvider._dbProvider.put<AssetBlockheight>(key, value);
  getMany = async (limit = 10, reverse = true): Promise<{ key: string; val: AssetBlockheight }[]> => AssetBlockHeightProvider._dbProvider.getMany<AssetBlockheight>(limit, reverse);
}
