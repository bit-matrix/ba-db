import { PoolProvider } from "../providers/PoolProvider";

export const poolService = {
  getPools: async () => {
    const provider = await PoolProvider.getProvider();
    const pools = await provider.getMany();
    return pools;
  },

  getPool: async (asset: string) => {
    const provider = await PoolProvider.getProvider();
    const pool = await provider.get(asset);
    return pool;
  },
};
