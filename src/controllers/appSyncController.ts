import { AppSync } from "@bitmatrix/models";
import { NextFunction, Request, Response } from "express";
import { BitmatrixSocket } from "../lib/BitmatrixSocket";
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

      await provider.put("testnetbitmatrix", newState);

      const bitmatrixSocket = BitmatrixSocket.getInstance();
      bitmatrixSocket.io.sockets.emit("appSync", newState);

      return res.status(200).send({ status: true });
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },
};
