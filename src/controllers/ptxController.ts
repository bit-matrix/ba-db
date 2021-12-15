import { NextFunction, Request, Response } from "express";
import { PoolTx } from "../models/PoolTx";
import { PoolTxProvider } from "../providers/PoolTxProvider";

export const ptxController = {
  getAllLastLimit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit: number = Number(req.query.limit || 10);

      const provider = await PoolTxProvider.getProvider();
      const result = await provider.getMany(limit);
      res.status(200).send(result);
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blockHash = req.params.id;

      const provider = await PoolTxProvider.getProvider();
      const result = await provider.get(blockHash);
      res.status(200).send(result);
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keyVal = <{ key: string; value: PoolTx }>req.body;

      const provider = await PoolTxProvider.getProvider();
      await provider.put(keyVal.key, keyVal.value);

      res.status(200).send({ status: true });
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },
};
