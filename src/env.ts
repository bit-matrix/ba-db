import { AppSync } from "@bitmatrix/models";

const db_internal_port = process.env.DB_INTERNAL_PORT || "4499";
const db_internal_data_dir = process.env.DB_INTERNAL_DATA_DIR || "data_dir";

export const DATA_DIR: string = db_internal_data_dir + "/";
export const LISTEN_PORT: number = Number(db_internal_port);

export const APP_NAME: string = "mainnetbitmatrix";

export const INITIAL_BLOCK: AppSync = {
  bestBlockHeight: 2009168,
  blockHash: "666da645fd5c2e759fbd05e21d5ef5e7d0d49441d9707caf575146ef4ecc7998",
  blockHeight: 2009168,
  synced: false,
};
