import { NextFunction, Request, Response } from "express";
import { Pool } from "@bitmatrix/models";
import { PoolProvider } from "../providers/PoolProvider";

export const poolController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const provider = await PoolProvider.getProvider();
      const result = await provider.getMany(50);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const provider = await PoolProvider.getProvider();
      const result = await provider.get(req.params.asset);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.id) {
        // commented for new pool insert
        // await isPoolAsset(req.body.id);

        const updatedPool = <Pool>req.body;
        const provider = await PoolProvider.getProvider();
        await provider.put(updatedPool.id, updatedPool);
        return res.status(200).send({ status: true });
      } else {
        return res.status(501).send({ status: false, error: "Pool id not found" });
      }
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  del: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const provider = await PoolProvider.getProvider();
      const result = await provider.delete(req.params.asset);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },
};
