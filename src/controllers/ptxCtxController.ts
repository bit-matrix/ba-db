import { NextFunction, Request, Response } from "express";
import { PtxCtxProvider } from "../providers/TxProviders/PtxCtxProvider";
import { isPoolAsset } from "./common";

export const ptxCtxController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const ptxid = req.params.ptxid;

      const ptxCtxProvider = await PtxCtxProvider.getProvider(asset);
      const ctxid = await ptxCtxProvider.get(ptxid);

      return res.status(200).send(ctxid);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },
};
