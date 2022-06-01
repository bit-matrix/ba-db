import { NextFunction, Request, Response } from "express";
import { AppSync } from "../AppSync";
import { AppSyncProvider } from "../providers/AppSyncProvider";

export const appSyncController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const provider = await AppSyncProvider.getProvider();
      const result = await provider.get(req.params.appId);
      console.log(req.params.appId);
      console.log(result);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.id) {
        const newState = <AppSync>req.body;
        const provider = await AppSyncProvider.getProvider();

        await provider.put(newState.id, newState);
        return res.status(200).send({ status: true });
      } else {
        return res.status(501).send({ status: false, error: "App id not found" });
      }
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },
};
