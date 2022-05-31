import { Pool } from "@bitmatrix/models";
import { PoolProvider } from "../providers/PoolProvider";
import { calcTokenPrice, deepCopy } from "../utils/helper";

export const poolBusiness = {
  getPools: async () => {
    const provider = await PoolProvider.getProvider();
    const pools = await provider.getMany();
    const newPools = calcTokenPrice(pools);
    if (newPools.length > 0) {
      let sortedPools: Pool[] = [];
      let i: number = 0;
      do {
        i++;
        if (newPools[i + 1] && newPools[i].quote.ticker === newPools[i + 1].quote.ticker && newPools[i].token.ticker === newPools[i + 1].token.ticker) {
          sortedPools = pools.sort((a, b) => {
            if (b.tokenPrice! < a.tokenPrice!) {
              return -1;
            } else if (b.tokenPrice! > a.tokenPrice!) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          sortedPools = deepCopy(newPools);
        }
      } while (i < newPools.length);
      return sortedPools;
    }
  },

  getPool: async (asset: string) => {
    const provider = await PoolProvider.getProvider();
    const pool = await provider.get(asset);
    if (pool) {
      const newPools = calcTokenPrice([pool]);
      return newPools[0];
    }
  },

  postPool: async (pool: Pool) => {
    const provider = await PoolProvider.getProvider();
    await provider.put(pool.id, pool);
    return true;
  },
};
