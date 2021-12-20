import { NextFunction, Request, Response } from "express";
import { isPoolAsset } from "./common";
import { ConfigProvider } from "../providers/TxProviders/ConfigProvider";

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
};
