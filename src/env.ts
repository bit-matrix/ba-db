import { AppSync } from "@bitmatrix/models";

const db_internal_port = process.env.DB_INTERNAL_PORT || "4499";
const db_internal_data_dir = process.env.DB_INTERNAL_DATA_DIR || "data_dir";

export const DATA_DIR: string = db_internal_data_dir + "/";
export const LISTEN_PORT: number = Number(db_internal_port);

export const APP_NAME: string = "testnetbitmatrix";

export const INITIAL_BLOCK: AppSync = {
  bestBlockHeight: 510233,
  blockHash: "213c6e75d27a70a186130908a38de0368032fc21c7374ef4a2a358b74b69e966",
  blockHeight: 510233,
  synced: true,
};
