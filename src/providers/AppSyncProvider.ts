import rocksdb from "rocksdb";
import { DATA_DIR } from "../env";
import { RocksDbProvider } from "./RocksDbProvider";
import { AppSync } from "../AppSync";

export class AppSyncProvider {
  private static location: string = DATA_DIR + "appsync";
  private static _dbProvider: RocksDbProvider;
  private static _provider: AppSyncProvider;
  private constructor() {}

  public static getProvider = async (): Promise<AppSyncProvider> => {
    if (AppSyncProvider._provider === undefined) {
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

      AppSyncProvider._dbProvider = new RocksDbProvider(db);
      AppSyncProvider._provider = new AppSyncProvider();
    }
    return AppSyncProvider._provider;
  };

  get = async (key: string): Promise<AppSync | undefined> => AppSyncProvider._dbProvider.get<AppSync>(key);
  put = async (key: string, value: AppSync): Promise<void> => AppSyncProvider._dbProvider.put<AppSync>(key, value);
}
