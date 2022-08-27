import { AppSync } from "@bitmatrix/models";
import { AppSyncProvider } from "./providers/AppSyncProvider";

export const appChecker = async () => {
  const provider = await AppSyncProvider.getProvider();

  const result = await provider.get("testnetbitmatrix");

  if (result) {
    return true;
  } else {
    const dummyApp: AppSync = {
      bestBlockHeight: 493457,
      blockHash: "59d00accd70275b67ba152480de43de47f988ed6cc260d37212410c80f95087d",
      blockHeight: 493457,
      synced: false,
    };

    await provider.put("testnetbitmatrix", dummyApp);

    return true;
  }
};
