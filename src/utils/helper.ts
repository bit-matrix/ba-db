import { Pool } from "@bitmatrix/models";
import { LBTC_ASSET_HASH, USDT_ASSET_HASH } from "../config";

export const deepCopy = <T>(original: T): T => {
  return JSON.parse(JSON.stringify(original));
};

export const calcPoolsTokenPrices = (pools: Pool[]) => {
  const newPools = deepCopy(pools);

  newPools.forEach((pool) => {
    pool = calcTokenPrice(pool);
  });

  return newPools;
};

export const calcTokenPrice = (pool: Pool) => {
  const clonedPool = deepCopy(pool);

  if (clonedPool.quote.assetHash === LBTC_ASSET_HASH) {
    clonedPool.tokenPrice = Number(clonedPool.token.value) / Number(clonedPool.quote.value);
  } else if (clonedPool.quote.assetHash === USDT_ASSET_HASH) {
    clonedPool.tokenPrice = Number(clonedPool.quote.value) / Number(clonedPool.token.value);
  } else {
    clonedPool.tokenPrice = 0;
  }

  return clonedPool;
};
