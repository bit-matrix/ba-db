import { AppSync } from "@bitmatrix/models";
import { AppSyncProvider } from "./providers/AppSyncProvider";

export const appChecker = async () => {
  const provider = await AppSyncProvider.getProvider();

  const result = await provider.get("testnetbitmatrix");

  if (result) {
    return true;
  } else {
    const dummyApp: AppSync = {
      bestBlockHeight: 506342,
      blockHash: "869ee5d3e2f3a88172cba169b34fd350d751ecee123fdfcde0b019ce415f938d",
      blockHeight: 506342,
      synced: false,
    };

    await provider.put("testnetbitmatrix", dummyApp);

    return true;
  }
};
