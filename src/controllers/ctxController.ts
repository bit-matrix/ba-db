import { NextFunction, Request, Response } from "express";
import { CommitmentTx } from "../models/CommitmentTx";
import { CommitmentTxActiveProvider } from "../providers/CommitmentTxActiveProvider";
import { CommitmentTxProvider } from "../providers/CommitmentTxProvider";

export const ctxController = {
  getAllLastLimit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit: number = Number(req.query.limit || 10);

      const active: boolean = req.query.active !== "false";
      if (active) {
        const provider = await CommitmentTxActiveProvider.getProvider();
        const result = await provider.getMany(limit);
        res.status(200).send(result);
      } else {
        const provider = await CommitmentTxProvider.getProvider();
        const result = await provider.getMany(limit);
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blockHash = req.params.id;

      const active: boolean = req.params.active !== "false";
      if (active) {
        const provider = await CommitmentTxActiveProvider.getProvider();
        const result = await provider.get(blockHash);
        res.status(200).send(result);
      } else {
        const provider = await CommitmentTxProvider.getProvider();
        const result = await provider.get(blockHash);
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keyVal = <{ key: string; value: CommitmentTx }>req.body;

      const providerActive = await CommitmentTxActiveProvider.getProvider();
      await providerActive.put(keyVal.key, keyVal.value);

      const provider = await CommitmentTxProvider.getProvider();
      await provider.put(keyVal.key, keyVal.value);

      res.status(200).send({ status: true });
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },
};
