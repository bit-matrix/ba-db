import rocksdb from "rocksdb";
import { DATA_DIR } from "../env";
import { CommitmentTx } from "../models/CommitmentTx";
import { RocksDbProvider } from "./RocksDbProvider";

export class CommitmentTxProvider {
  private static location: string = DATA_DIR + "asset_ctx_43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd";
  private static _dbProvider: RocksDbProvider;
  private static _provider: CommitmentTxProvider;
  private constructor() {}

  public static getProvider = async (): Promise<CommitmentTxProvider> => {
    if (CommitmentTxProvider._provider === undefined) {
      const db = rocksdb(CommitmentTxProvider.location);

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

      CommitmentTxProvider._dbProvider = new RocksDbProvider(db);
      CommitmentTxProvider._provider = new CommitmentTxProvider();
    }
    return CommitmentTxProvider._provider;
  };

  get = async (key: string): Promise<CommitmentTx | undefined> => CommitmentTxProvider._dbProvider.get<CommitmentTx>(key);
  put = async (key: string, value: CommitmentTx): Promise<void> => CommitmentTxProvider._dbProvider.put<CommitmentTx>(key, value);
  getMany = async (limit = 10, reverse = true): Promise<CommitmentTx[]> => {
    const result = await CommitmentTxProvider._dbProvider.getMany<CommitmentTx>(limit, reverse);
    return result.map((r) => r.val) || [];
  };
}
