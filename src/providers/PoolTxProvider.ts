import rocksdb from "rocksdb";
import { DATA_DIR } from "../env";
import { PoolTx } from "../models/PoolTx";
import { RocksDbProvider } from "./RocksDbProvider";

export class PoolTxProvider {
  private location: string = DATA_DIR + "asset_ptx_43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd";
  private static _dbProvider: RocksDbProvider;
  private static _provider: PoolTxProvider;
  private constructor() {}

  public getProvider = async (): Promise<PoolTxProvider> => {
    if (PoolTxProvider._provider === undefined) {
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

      PoolTxProvider._dbProvider = new RocksDbProvider(db);
      PoolTxProvider._provider = new PoolTxProvider();
    }
    return PoolTxProvider._provider;
  };

  get = async (key: string): Promise<PoolTx[]> => PoolTxProvider._dbProvider.get<PoolTx[]>(key);
  put = async (key: string, value: PoolTx[]): Promise<void> => PoolTxProvider._dbProvider.put<PoolTx[]>(key, value);
  getMany = async (limit = 10, reverse = true): Promise<{ key: string; val: PoolTx[] }[]> => PoolTxProvider._dbProvider.getMany<PoolTx[]>(limit, reverse);
}
