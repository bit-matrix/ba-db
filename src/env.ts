import { AppSync } from "@bitmatrix/models";

const db_internal_port = process.env.DB_INTERNAL_PORT || "4499";
const db_internal_data_dir = process.env.DB_INTERNAL_DATA_DIR || "data_dir";

export const DATA_DIR: string = db_internal_data_dir + "/";
export const LISTEN_PORT: number = Number(db_internal_port);

export const APP_NAME: string = "mainnetbitmatrix";

export const INITIAL_BLOCK: AppSync = {
  bestBlockHeight: 2010143,
  blockHash: "68a6ac66180be36eabf5af37c02c0a1a7e8c9e8be60c0457f6e60cb192652329",
  blockHeight: 2010143,
  synced: false,
};
