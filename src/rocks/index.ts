import rocksdb from "rocksdb";

/* export enum FILE_TABLE {
  ASSET_BLOCKHEIGHT = "asset_blockheight", // key = asset:CTX || asset:PTX

  ASSET_CTX_0 = "asset_ctx_43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd", // + NFT_ASSET_ID pools[0].asset,
  ASSET_PTX_0 = "asset_ptx_43a2f4ef8ce286e57ab3e39e6da3741382ba542854a1b28231a7a5b8ba337fcd", // + NFT_ASSET_ID, pools[0].asset

  TEST = "penguen",
}
const FILE_TABLES: FILE_TABLE[] = [FILE_TABLE.ASSET_BLOCKHEIGHT, FILE_TABLE.ASSET_CTX_0, FILE_TABLE.ASSET_PTX_0 ,FILE_TABLE.TEST];

export const assetFileTable = (asset: string, tx: "CTX" | "PTX") => {
  const fileTableString = "asset_" + tx.toLowerCase() + "_" + asset;
  return <FILE_TABLE>fileTableString;
}; */

const DATA_DIR: string = process.env.DATA_DIR || "/tmp/db/";

const dbs: { file: string; db: rocksdb }[] = [].map((f) => ({ file: f, db: rocksdb(DATA_DIR + f) }));

export const openDbs = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const promises: Promise<void>[] = [];

    dbs.forEach((d) => {
      const p = new Promise<void>((resolve, reject) => {
        d.db.open({ createIfMissing: true, errorIfExists: false }, (err) => {
          if (err) {
            console.error("db.open.error", err);
            reject(err);
          }

          resolve();
        });
      });

      promises.push(p);
    });

    return Promise.all(promises)
      .then(() => resolve())
      .catch(() => reject());
  });
};

export const put = async <T>(key: string, value: T, file: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const fdb = dbs.find((d) => d.file === file);
    if (fdb) {
      fdb.db.put(key, Buffer.from(JSON.stringify(value)), { sync: true }, (err) => {
        if (err) {
          console.error("db.put.error", err);
          reject(err);
        }

        resolve();
      });
    } else {
      reject();
    }
  });
};

export const get = async <T>(key: string, file: string): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const fdb = dbs.find((d) => d.file === file);
    if (fdb) {
      fdb.db.get(key, { sync: true }, (err, val) => {
        if (err) {
          // console.error("db.get.error", err);
          reject(err);
        }

        if (val) resolve(JSON.parse(val.toString("utf8")));
        else reject();
      });
    } else {
      reject();
    }
  });
};

export const getMany = async <T>(limit = 10, file: string): Promise<{ key: string; val: T }[]> => {
  return new Promise<{ key: string; val: T }[]>(async (resolve, reject) => {
    const fdb = dbs.find((d) => d.file === file);

    if (fdb) {
      // const promises: Promise<{ key: string; val: T }>[] = [];
      const result: { key: string; val: T }[] = [];

      // console.log("it.finished", it.finished);
      try {
        const it: rocksdb.Iterator = fdb.db.iterator({ reverse: true, limit });

        let i = 0;
        const next = () => {
          if (i < limit) {
            i++;

            it.next((err, key, val) => {
              if (err) {
                console.error("it.next.error", err);
                reject();
              } else if (key === undefined && val === undefined) {
                it.end(() => {});
                // console.log("it.next.finished");
                resolve(result);
              } else {
                // console.log("r: " + key.toString());
                result.push({
                  key: key.toString("utf8"),
                  val: <T>JSON.parse(val.toString("utf8")),
                });
                next();
              }
            });
          } else {
            it.end(() => {});
            resolve(result);
          }
        };

        next();
      } catch (err) {
        console.error(err);
        reject();
      }
    } else {
      reject();
    }
  });
};
