import { Pool } from "@bitmatrix/models";
import { LBTC_ASSET_HASH, USDT_ASSET_HASH } from "../config";

export const deepCopy = <T>(original: T): T => {
  return JSON.parse(JSON.stringify(original));
};

export const calcTokenPrice = (pools: Pool[]) => {
  const clonedPools = deepCopy(pools);
  clonedPools.forEach((pool) => {
    if (pool.quote.assetHash === LBTC_ASSET_HASH) {
      pool.tokenPrice = Number(pool.token.value) / Number(pool.quote.value);
    } else if (pool.quote.assetHash === USDT_ASSET_HASH) {
      pool.tokenPrice = Number(pool.quote.value) / Number(pool.token.value);
    } else {
      pool.tokenPrice = 0;
    }
  });

  return clonedPools;
};
