import { AppSync } from "@bitmatrix/models";

const db_internal_port = process.env.DB_INTERNAL_PORT || "4499";
const db_internal_data_dir = process.env.DB_INTERNAL_DATA_DIR || "data_dir";

export const DATA_DIR: string = db_internal_data_dir + "/";
export const LISTEN_PORT: number = Number(db_internal_port);

export const APP_NAME: string = "testnetbitmatrix";

export const INITIAL_BLOCK: AppSync = {
  bestBlockHeight: 493457,
  blockHash: "59d00accd70275b67ba152480de43de47f988ed6cc260d37212410c80f95087d",
  blockHeight: 493457,
  synced: false,
};
