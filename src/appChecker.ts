import { AppSync } from "@bitmatrix/models";
import { AppSyncProvider } from "./providers/AppSyncProvider";

export const appChecker = async () => {
  const provider = await AppSyncProvider.getProvider();

  const result = await provider.get("testnetbitmatrix");

  if (result) {
    return true;
  } else {
    const dummyApp: AppSync = {
      bestBlockHeight: 478367,
      blockHash: "0dc6bdfdb0a18923b683730dfae9ebc6b3f121c965f03d05f831ed628af94042",
      blockHeight: 478367,
      synced: false,
    };

    await provider.put("testnetbitmatrix", dummyApp);

    return true;
  }
};
