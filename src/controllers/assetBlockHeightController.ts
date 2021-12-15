import { NextFunction, Request, Response } from "express";
import { AssetBlockheight } from "../models/AssetBlockheight";
import { AssetBlockHeightProvider } from "../providers/AssetBlockHeightProvider";

export const assetBlockHeightController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poolAsset = req.params.id;
      if (poolAsset) {
        const provider = await AssetBlockHeightProvider.getProvider();
        const ctxData = await provider.get(poolAsset + ":CTX");
        const ptxData = await provider.get(poolAsset + ":PTX");
        const result = { ctx: ctxData, ptx: ptxData };
        res.status(200).send(result);
      } else {
        res.status(400).send({ status: false });
      }
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poolAsset = req.params.id;
      const type = req.params.type;

      if (poolAsset && type && (type.toUpperCase() === "CTX" || type.toUpperCase() === "PTX")) {
        const key = poolAsset + ":" + type.toUpperCase();
        const value = <AssetBlockheight>req.body;
        const provider = await AssetBlockHeightProvider.getProvider();
        await provider.put(key, value);
        res.status(200).send({ status: true });
      } else {
        res.status(400).send({ status: false });
      }
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },
};
