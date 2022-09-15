import { AppSync } from "@bitmatrix/models";

const db_internal_port = process.env.DB_INTERNAL_PORT || "4499";
const db_internal_data_dir = process.env.DB_INTERNAL_DATA_DIR || "data_dir";

export const DATA_DIR: string = db_internal_data_dir + "/";
export const LISTEN_PORT: number = Number(db_internal_port);

export const APP_NAME: string = "mainnetbitmatrix";

export const INITIAL_BLOCK: AppSync = {
  bestBlockHeight: 2009615,
  blockHash: "39d3539cf26b0589c8365c82da91850c4127d9334827b8bed904a83c1db0cd06",
  blockHeight: 2009615,
  synced: false,
};
