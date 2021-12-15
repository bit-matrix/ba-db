import rocksdb from "rocksdb";
import { AssetBlockheight } from "../models/AssetBlockheight";
import { RocksDbProvider } from "./RocksDbProvider";

const DATA_DIR: string = process.env.DATA_DIR || "/ba-db/data-dir/";

export class AssetBlockHeightProvider {
  private location: string = DATA_DIR + "asset_blockheight";
  private static _dbProvider: RocksDbProvider;
  private static _provider: AssetBlockHeightProvider;
  private constructor() {}

  public getProvider = async (): Promise<AssetBlockHeightProvider> => {
    if (AssetBlockHeightProvider._provider === undefined) {
      const db = rocksdb(this.location);

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

  get = async (key: string): Promise<AssetBlockheight> => AssetBlockHeightProvider._dbProvider.get<AssetBlockheight>(key);
  put = async (key: string, value: AssetBlockheight): Promise<void> => AssetBlockHeightProvider._dbProvider.put<AssetBlockheight>(key, value);
  getMany = async (limit = 10, reverse = true): Promise<{ key: string; val: AssetBlockheight }[]> => AssetBlockHeightProvider._dbProvider.getMany<AssetBlockheight>(limit, reverse);
}
