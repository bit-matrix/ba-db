import { NextFunction, Request, Response } from "express";
import { ConfigProvider } from "../providers/TxProviders/ConfigProvider";
import { BmConfig } from "@bitmatrix/models";

export const configController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const provider = await ConfigProvider.getProvider();
      const result = await provider.get("bitmatrixpoolinitConfig");

      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newPoolConfig = <BmConfig>req.body;

      const provider = await ConfigProvider.getProvider();
      const isExist = await provider.get("bitmatrixpoolinitConfig");

      if (isExist) {
        return res.status(501).send({ status: false, error: "Config is currently exist" });
      }

      await provider.put("bitmatrixpoolinitConfig", newPoolConfig);

      return res.status(200).send({ status: true });
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },
};
