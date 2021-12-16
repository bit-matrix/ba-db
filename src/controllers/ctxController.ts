import { NextFunction, Request, Response } from "express";
import { CommitmentTx } from "../models/CommitmentTx";
import { isPoolAsset } from "./common";
import { CtxActiveProvider } from "../providers/AssetProviders/CtxActiveProvider";
import { CtxProvider } from "../providers/AssetProviders/CtxProvider";

export const ctxController = {
  getAllLastLimit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const limit: number = Number(req.query.limit || 10);
      const active: boolean = req.query.active !== "false";

      if (active) {
        const provider = await CtxActiveProvider.getProvider(asset);
        const result = await provider.getMany(limit);
        res.status(200).send(result);
      } else {
        const provider = await CtxProvider.getProvider(asset);
        const result = await provider.getMany(limit);
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const blockHash = req.params.id;

      const active: boolean = req.params.active !== "false";
      if (active) {
        const provider = await CtxActiveProvider.getProvider(asset);
        const result = await provider.get(blockHash);
        res.status(200).send(result);
      } else {
        const provider = await CtxProvider.getProvider(asset);
        const result = await provider.get(blockHash);
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const keyVal = <{ key: string; value: CommitmentTx }>req.body;

      const providerActive = await CtxActiveProvider.getProvider(asset);
      await providerActive.put(keyVal.key, keyVal.value);

      const provider = await CtxProvider.getProvider(asset);
      await provider.put(keyVal.key, keyVal.value);

      res.status(200).send({ status: true });
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },
};
