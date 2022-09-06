import { AppSync } from "@bitmatrix/models";

const db_internal_port = process.env.DB_INTERNAL_PORT || "4499";
const db_internal_data_dir = process.env.DB_INTERNAL_DATA_DIR || "data_dir";

export const DATA_DIR: string = db_internal_data_dir + "/";
export const LISTEN_PORT: number = Number(db_internal_port);

export const APP_NAME: string = "testnetbitmatrix";

export const INITIAL_BLOCK: AppSync = {
  bestBlockHeight: 507193,
  blockHash: "dabebfbd109cd85e2271aa73ad6e4d3edf877b1b64982993da093e9df80c9ce4",
  blockHeight: 507193,
  synced: false,
};
