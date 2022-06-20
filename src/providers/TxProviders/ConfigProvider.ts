import rocksdb from "rocksdb";
import { DATA_DIR } from "../../env";
import { RocksDbProvider } from "../RocksDbProvider";
import { BmConfig } from "@bitmatrix/models";

export class ConfigProvider {
  private static location: string = DATA_DIR + "poolConfig";
  private static _dbProvider: RocksDbProvider;
  private static _provider: ConfigProvider;
  private constructor() {}

  public static getProvider = async (): Promise<ConfigProvider> => {
    if (ConfigProvider._provider === undefined) {
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

      ConfigProvider._dbProvider = new RocksDbProvider(db);
      ConfigProvider._provider = new ConfigProvider();
    }

    return ConfigProvider._provider;
  };

  get = async (key: string): Promise<BmConfig | undefined> => ConfigProvider._dbProvider.get<BmConfig>(key);

  put = async (key: string, value: BmConfig): Promise<void> => ConfigProvider._dbProvider.put<BmConfig>(key, value);
}
