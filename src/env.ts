import { AppSync } from "@bitmatrix/models";

const db_port = process.env.DB_PORT || "8001";

export const DATA_DIR: string = (process.env.API_INTERNAL_DATA_DIR || "/datavolumemulti") + "/";
export const LISTEN_PORT: number = Number(db_port);

export const APP_NAME: string = "testnetbitmatrix";

export const INITIAL_BLOCK: AppSync = {
  bestBlockHeight: 493457,
  blockHash: "59d00accd70275b67ba152480de43de47f988ed6cc260d37212410c80f95087d",
  blockHeight: 493457,
  synced: false,
};
