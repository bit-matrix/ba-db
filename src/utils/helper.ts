import { Pool } from "@bitmatrix/models";

export const deepCopy = <T>(original: T): T => {
  return JSON.parse(JSON.stringify(original));
};

export const calcTokenPrice = (pools: Pool[]) => {
  const clonedPools = deepCopy(pools);
  clonedPools.map((pool) => {
    if (pool.quote.ticker === "tL-BTC") {
      pool.tokenPrice = Number(pool.token.value) / Number(pool.quote.value);
    } else if (pool.quote.ticker === "tL-USDt") {
      pool.tokenPrice = Number(pool.quote.value) / Number(pool.token.value);
    } else {
      pool.tokenPrice = 0;
    }
  });
  return clonedPools;
};
