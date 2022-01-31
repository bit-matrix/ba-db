import { NextFunction, Request, Response } from "express";
import { isPoolAsset } from "./common";
import { ConfigProvider } from "../providers/TxProviders/ConfigProvider";
import { BmConfig } from "@bitmatrix/models";

export const configController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const provider = await ConfigProvider.getProvider(asset);
      const result = await provider.get(req.params.asset);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.id) {
        const asset = req.params.asset;
        const updatedPoolConfig = <BmConfig>req.body;

        const provider = await ConfigProvider.getProvider(asset);
        await provider.put(req.params.asset, updatedPoolConfig);
        return res.status(200).send({ status: true });
      } else {
        return res.status(501).send({ status: false, error: "Pool config id not found" });
      }
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },
};
