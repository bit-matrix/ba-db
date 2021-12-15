import rocksdb from "rocksdb";
import { DATA_DIR } from "../env";
import { Pool } from "../models/Pool";
import { RocksDbProvider } from "./RocksDbProvider";

export class PoolProvider {
  private static location: string = DATA_DIR + "pool";
  private static _dbProvider: RocksDbProvider;
  private static _provider: PoolProvider;
  private constructor() {}

  public static getProvider = async (): Promise<PoolProvider> => {
    if (PoolProvider._provider === undefined) {
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

      PoolProvider._dbProvider = new RocksDbProvider(db);
      PoolProvider._provider = new PoolProvider();
    }
    return PoolProvider._provider;
  };

  get = async (key: string): Promise<Pool | undefined> => PoolProvider._dbProvider.get<Pool>(key);
  put = async (key: string, value: Pool): Promise<void> => PoolProvider._dbProvider.put<Pool>(key, value);
  getMany = async (limit = 10, reverse = true): Promise<{ key: string; val: Pool }[]> => PoolProvider._dbProvider.getMany<Pool>(limit, reverse);
}
