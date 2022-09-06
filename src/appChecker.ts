import { APP_NAME, INITIAL_BLOCK } from "./env";
import { AppSyncProvider } from "./providers/AppSyncProvider";

export const appChecker = async () => {
  const provider = await AppSyncProvider.getProvider();

  const result = await provider.get(APP_NAME);

  if (result) {
    return true;
  } else {
    await provider.put(APP_NAME, INITIAL_BLOCK);
    return true;
  }
};
