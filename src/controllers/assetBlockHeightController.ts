import { NextFunction, Request, Response } from "express";
import { AssetBlockheight } from "../models/AssetBlockheight";
import { isPoolAsset } from "./common";
import { AssetBlockHeightProvider } from "../providers/AssetBlockHeightProvider";

export const assetBlockHeightController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const provider = await AssetBlockHeightProvider.getProvider();
      const ctxData = await provider.get(asset + ":CTX");
      const ptxData = await provider.get(asset + ":PTX");
      const result = { ctx: ctxData, ptx: ptxData };
      res.status(200).send(result);
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },

  getByType: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const type = req.params.type;

      if (type && (type.toUpperCase() === "CTX" || type.toUpperCase() === "PTX")) {
        const provider = await AssetBlockHeightProvider.getProvider();
        let result: AssetBlockheight | undefined;
        const key = asset + ":" + type.toUpperCase();
        if (type.toUpperCase() === "CTX") {
          result = await provider.get(asset + ":CTX");
        } else {
          result = await provider.get(asset + ":PTX");
        }
        return res.status(200).send(result);
      } else {
        return res.status(400).send({ status: false });
      }
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const type = req.params.type;

      if (type && (type.toUpperCase() === "CTX" || type.toUpperCase() === "PTX")) {
        const key = asset + ":" + type.toUpperCase();
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
