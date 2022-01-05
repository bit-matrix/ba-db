import { NextFunction, Request, Response } from "express";
import { initialDatas } from "../initialDatas";
import { isPoolAsset } from "./common";
import { CtxNewProvider } from "../providers/TxProviders/CtxNewProvider";
import { CtxMempoolProvider } from "../providers/TxProviders/CtxMempoolProvider";
import { PtxProvider } from "../providers/TxProviders/PtxProvider";
import { PtxCtxProvider } from "../providers/TxProviders/PtxCtxProvider";

export const clearController = {
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      let b = req.query.b;
      let lastSyncedBlockHeight: number | undefined;
      if (b !== undefined) {
        lastSyncedBlockHeight = Number(b);
      }

      const promises: Promise<void>[] = [];

      // clear all new ctx
      const ctxActiveProvider = await CtxNewProvider.getProvider(asset);
      promises.push(ctxActiveProvider.clear());

      // clear all ctx mempool
      const ctxMempoolProvider = await CtxMempoolProvider.getProvider(asset);
      promises.push(ctxMempoolProvider.clear());

      // clear all ptx-ctx[]
      const ptxCtxProvider = await PtxCtxProvider.getProvider(asset);
      promises.push(ptxCtxProvider.clear());

      // clear all ptx
      const ptxProvider = await PtxProvider.getProvider(asset);
      promises.push(ptxProvider.clear());

      // initialpool data - config data
      promises.push(initialDatas(lastSyncedBlockHeight));

      return Promise.all(promises)
        .then(() => {
          return res.status(200).send({ status: true });
        })
        .catch((err) => {
          return res.status(501).send({ status: false, error: err });
        });
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },
};
