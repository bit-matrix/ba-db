import rocksdb from "rocksdb";
import { DATA_DIR } from "../env";
import { CommitmentTx } from "../models/CommitmentTx";
import { RocksDbProvider } from "./RocksDbProvider";

export class CommitmentTxActiveProvider {
  private location: string = DATA_DIR + "asset_ctx_active_43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd";
  private static _dbProvider: RocksDbProvider;
  private static _provider: CommitmentTxActiveProvider;
  private constructor() {}

  public getProvider = async (): Promise<CommitmentTxActiveProvider> => {
    if (CommitmentTxActiveProvider._provider === undefined) {
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

      CommitmentTxActiveProvider._dbProvider = new RocksDbProvider(db);
      CommitmentTxActiveProvider._provider = new CommitmentTxActiveProvider();
    }
    return CommitmentTxActiveProvider._provider;
  };

  get = async (key: string): Promise<CommitmentTx[]> => CommitmentTxActiveProvider._dbProvider.get<CommitmentTx[]>(key);
  put = async (key: string, value: CommitmentTx[]): Promise<void> => CommitmentTxActiveProvider._dbProvider.put<CommitmentTx[]>(key, value);
  getMany = async (limit = 10, reverse = true): Promise<{ key: string; val: CommitmentTx[] }[]> => CommitmentTxActiveProvider._dbProvider.getMany<CommitmentTx[]>(limit, reverse);
}
