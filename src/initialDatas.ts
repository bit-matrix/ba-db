import { POOLS } from "./data";
import { PoolProvider } from "./providers/PoolProvider";

export const initialDatas = async (): Promise<void> => {
  const provider = await PoolProvider.getProvider();
  const promises: Promise<void>[] = [];

  POOLS.forEach((p) => {
    promises.push(provider.put(p.asset, p));
  });

  return Promise.all(promises).then(() => {});
};
