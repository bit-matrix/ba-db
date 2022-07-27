import { PoolProvider } from "../providers/PoolProvider";
import { calcTokenPrice } from "../utils/helper";

export const poolService = {
  getPools: async () => {
    const provider = await PoolProvider.getProvider();
    const pools = await provider.getMany();
    const newPools = calcTokenPrice(pools);
    return newPools;
  },

  getPool: async (asset: string) => {
    const provider = await PoolProvider.getProvider();
    const pool = await provider.get(asset);
    if (pool) {
      const newPool = calcTokenPrice([pool]);
      return newPool[0];
    }
  },
};
