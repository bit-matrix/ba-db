import { NextFunction, Request, Response } from "express";
import { poolBusiness } from "../business/poolBusiness";

export const poolController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await poolBusiness.getPools();
      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await poolBusiness.getPool(req.params.asset);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.id) {
        const result = await poolBusiness.postPool(req.body);
        return res.status(200).send({ status: result });
      } else {
        return res.status(501).send({ status: false, error: "Pool id not found" });
      }
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },
};
