import { PoolProvider } from "../providers/PoolProvider";

export const isPoolAsset = async (mayAsset: any): Promise<boolean> => {
  if (mayAsset === "") throw new Error("Asset not found.");

  try {
    const provider = await PoolProvider.getProvider();
    const result = await provider.get(mayAsset);
    if (result === undefined) throw new Error("Asset not found.");
    return true;
  } catch (error) {
    throw error;
  }
};
