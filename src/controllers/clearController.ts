import { NextFunction, Request, Response } from "express";
import { isPoolAsset } from "./common";
import { CtxActiveProvider } from "../providers/AssetProviders/CtxActiveProvider";
import { CtxProvider } from "../providers/AssetProviders/CtxProvider";
import { PtxProvider } from "../providers/AssetProviders/PtxProvider";
import { AssetBlockHeightProvider } from "../providers/AssetBlockHeightProvider";

export const clearController = {
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const ctxActiveProvider = await CtxActiveProvider.getProvider(asset);
      const p1 = await ctxActiveProvider.clear();

      const ctxProvider = await CtxProvider.getProvider(asset);
      const p2 = await ctxProvider.clear();

      const ptxProvider = await PtxProvider.getProvider(asset);
      const p3 = await ptxProvider.clear();

      const assetBlockHeightProvider = await AssetBlockHeightProvider.getProvider();
      const p4 = await assetBlockHeightProvider.clear(asset);

      return Promise.all([p1, p2, p3, p4])
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
