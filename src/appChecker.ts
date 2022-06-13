import { AppSyncProvider } from "./providers/AppSyncProvider";

export const appChecker = async () => {
  const provider = await AppSyncProvider.getProvider();

  const result = await provider.get("1");

  if (result) {
    return true;
  } else {
    const dummyApp = {
      id: "1",
      blockHash: "41f97605327b79a7ab5482dba850eb1502827501e291204a3d61e4032699c73c",
      blockHeight: 382758,
      synced: false,
    };

    await provider.put(dummyApp.id, dummyApp);

    return true;
  }
};
