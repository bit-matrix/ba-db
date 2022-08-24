import { AppSync } from "@bitmatrix/models";
import { AppSyncProvider } from "./providers/AppSyncProvider";

export const appChecker = async () => {
  const provider = await AppSyncProvider.getProvider();

  const result = await provider.get("testnetbitmatrix");

  if (result) {
    return true;
  } else {
    const dummyApp: AppSync = {
      bestBlockHeight: 488730,
      blockHash: "0ca4be87faf0c92750dceafd1700822b208efc6d11c1d32a29dcd3b391b3f41a",
      blockHeight: 488730,
      synced: false,
    };

    await provider.put("testnetbitmatrix", dummyApp);

    return true;
  }
};
