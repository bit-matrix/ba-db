import { ASSET_BLOCK_HEIGHT, POOLS } from "./data";
import { AssetBlockHeightProvider } from "./providers/AssetBlockHeightProvider";
import { PoolProvider } from "./providers/PoolProvider";

export const initialDatas = async (): Promise<void> => {
  const poolProvider = await PoolProvider.getProvider();
  const assetBlockHeightProvider = await AssetBlockHeightProvider.getProvider();

  const promises: Promise<void>[] = [];

  POOLS.forEach((p) => {
    promises.push(poolProvider.put(p.asset, p));
    assetBlockHeightProvider.put(p.asset + ":CTX", ASSET_BLOCK_HEIGHT);
    assetBlockHeightProvider.put(p.asset + ":PTX", ASSET_BLOCK_HEIGHT);
  });

  return Promise.all(promises).then(() => {});
};
