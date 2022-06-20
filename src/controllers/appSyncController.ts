import { AppSync } from "@bitmatrix/models";
import { NextFunction, Request, Response } from "express";
import { AppSyncProvider } from "../providers/AppSyncProvider";

export const appSyncController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const provider = await AppSyncProvider.getProvider();
      const result = await provider.get("testnetbitmatrix");

      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newState = <AppSync>req.body;
      const provider = await AppSyncProvider.getProvider();

      const isExist = await provider.get("testnetbitmatrix");

      if (isExist) {
        return res.status(501).send({ status: false, error: "App is currently exist" });
      }

      await provider.put("testnetbitmatrix", newState);
      return res.status(200).send({ status: true });
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },
};
