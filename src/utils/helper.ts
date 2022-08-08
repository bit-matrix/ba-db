import { Pool } from "@bitmatrix/models";
import { LBTC_ASSET_HASH, USDT_ASSET_HASH } from "../config";

export const deepCopy = <T>(original: T): T => {
  return JSON.parse(JSON.stringify(original));
};
