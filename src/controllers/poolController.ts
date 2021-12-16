import { NextFunction, Request, Response } from "express";
import { PoolProvider } from "../providers/PoolProvider";

export const poolController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const provider = await PoolProvider.getProvider();
      const result = await provider.getMany();
      res.status(200).send(result);
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const provider = await PoolProvider.getProvider();
      const result = await provider.get(req.params.asset);
      res.status(200).send(result);
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },
};
