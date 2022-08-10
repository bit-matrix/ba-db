import { Pool } from "@bitmatrix/models";
import { NextFunction, Request, Response } from "express";
import { BitmatrixSocket } from "../lib/BitmatrixSocket";
import { PoolProvider } from "../providers/PoolProvider";
import { poolService } from "../services/poolService";

export const poolController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await poolService.getPools();

      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await poolService.getPool(req.params.asset);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.id) {
        const updatedPool = <Pool>req.body;
        const provider = await PoolProvider.getProvider();
        await provider.put(updatedPool.id, updatedPool);

        const bitmatrixSocket = BitmatrixSocket.getInstance();
        const newPools = await provider.getMany();
        bitmatrixSocket.io.sockets.emit("pools", newPools);

        return res.status(200).send({ status: true });
      } else {
        return res.status(501).send({ status: false, error: "Pool not found" });
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
