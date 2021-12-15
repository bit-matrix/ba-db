import { NextFunction, Request, Response } from "express";
import { CommitmentTxActiveProvider } from "../providers/CommitmentTxActiveProvider";
import { CommitmentTxProvider } from "../providers/CommitmentTxProvider";

export const ctxController = {
  getAllLastLimit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit: number = Number(req.params.limit || 10);

      const active: boolean = req.params.active !== "false";
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
};
