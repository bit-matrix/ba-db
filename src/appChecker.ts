import { AppSync } from "@bitmatrix/models";
import { AppSyncProvider } from "./providers/AppSyncProvider";

export const appChecker = async () => {
  const provider = await AppSyncProvider.getProvider();

  const result = await provider.get("testnetbitmatrix");

  if (result) {
    return true;
  } else {
    const dummyApp: AppSync = {
      bestBlockHeight: 510233,
      blockHash: "213c6e75d27a70a186130908a38de0368032fc21c7374ef4a2a358b74b69e966",
      blockHeight: 510233,
      synced: false,
    };

    await provider.put("testnetbitmatrix", dummyApp);

    return true;
  }
};
