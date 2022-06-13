import { AppSyncProvider } from "./providers/AppSyncProvider";

export const appChecker = async () => {
  const provider = await AppSyncProvider.getProvider();

  const result = await provider.get("1");

  if (result) {
    return true;
  } else {
    const dummyApp = {
      id: "1",
      blockHash: "9de383539ed9feb7686cb4f9cf7b097007a5703ae15491063d22226170450da8",
      blockHeight: 385254,
      synced: false,
    };

    await provider.put(dummyApp.id, dummyApp);

    return true;
  }
};
