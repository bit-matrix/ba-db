import rocksdb from "rocksdb";

export class RocksDbProvider {
  private db: rocksdb;

  constructor(db: rocksdb) {
    this.db = db;
  }

  get = async <T>(key: string): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      this.db.get(key, { sync: true }, (err: Error | undefined, val: rocksdb.Bytes) => {
        if (err) {
          console.error("RocksDbProvider.get.error", err);
          reject(err);
        }

        if (val) resolve(JSON.parse(val.toString("utf8")));
        else reject();
      });
    });
  };

  put = async <T>(key: string, value: T): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.db.put(key, Buffer.from(JSON.stringify(value)), { sync: true }, (err: Error | undefined) => {
        if (err) {
          console.error("RocksDbProvider.put.error", err);
          reject(err);
        }
        resolve();
      });
    });
  };

  getMany = async <T>(limit = 10, reverse = true): Promise<{ key: string; val: T }[]> => {
    return new Promise<{ key: string; val: T }[]>(async (resolve, reject) => {
      const result: { key: string; val: T }[] = [];

      try {
        const it: rocksdb.Iterator = this.db.iterator({ reverse, limit });

        let i = 0;
        const next = () => {
          if (i < limit) {
            i++;

            it.next((err: Error | undefined, key: rocksdb.Bytes, val: rocksdb.Bytes) => {
              if (err) {
                console.error("RocksDbProvider.getMany.iterator.next.error", err);
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
        console.error("RocksDbProvider.getMany.error", err);
        reject();
      }
    });
  };
}
