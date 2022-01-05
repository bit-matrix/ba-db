import { PoolProvider } from "../providers/PoolProvider";
import { ConfigProvider } from "../providers/TxProviders/ConfigProvider";
import { POOLS_CONFIGS } from "./POOLS_CONFIGS";

export const initialDatas = async (lastSyncedBlockHeight?: number): Promise<void> => {
  const promises: Promise<void>[] = [];

  const poolProvider = await PoolProvider.getProvider();
  const currentPools = await poolProvider.getMany();
  const currentPoolIds = currentPools.map((cp) => cp.id);

  POOLS_CONFIGS.forEach(async (pc) => {
    if (!currentPoolIds.includes(pc.pool.id)) {
      const p = pc.pool;
      const c = pc.config;

      const lsbh = lastSyncedBlockHeight === undefined ? p.lastSyncedBlock.block_height : lastSyncedBlockHeight;
      promises.push(poolProvider.put(p.id, { ...p, lastSyncedBlock: { ...p.lastSyncedBlock, block_height: lsbh } }));

      const configProvider = await ConfigProvider.getProvider(p.id);
      promises.push(configProvider.put(p.id, c));
    }
  });

  return Promise.all(promises).then(() => {});
};
