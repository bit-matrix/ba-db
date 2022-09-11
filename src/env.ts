import { AppSync } from "@bitmatrix/models";

const db_internal_port = process.env.DB_INTERNAL_PORT || "4499";
const db_internal_data_dir = process.env.DB_INTERNAL_DATA_DIR || "data_dir";

export const DATA_DIR: string = db_internal_data_dir + "/";
export const LISTEN_PORT: number = Number(db_internal_port);

export const APP_NAME: string = "mainnetbitmatrix";

export const INITIAL_BLOCK: AppSync = {
  bestBlockHeight: 2003832,
  blockHash: "148b8f9d71f8c51f43d1ef35630563bba3b654e95225cce8f5798722ecc30fac",
  blockHeight: 2003832,
  synced: true,
};
