import { NextFunction, Request, Response } from "express";
import { BmPtx } from "@bitmatrix/models";
import { CtxMempoolProvider } from "../providers/TxProviders/CtxMempoolProvider";
import { PtxCtxProvider } from "../providers/TxProviders/PtxCtxProvider";
import { PtxProvider } from "../providers/TxProviders/PtxProvider";
import { isPoolAsset } from "./common";
import { CtxNewProvider } from "../providers/TxProviders/CtxNewProvider";

export const ptxController = {
  getAllLastLimit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const limit: number = Number(req.query.limit || 10);

      const provider = await PtxProvider.getProvider(asset);
      const result = await provider.getMany(limit);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const ctxid = req.params.ctxid;

      const ptxProvider = await PtxProvider.getProvider(asset);
      const result = await ptxProvider.get(ctxid);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const ptx = <BmPtx>req.body;

      // create ptx data
      const providerPtx = await PtxProvider.getProvider(asset);
      await providerPtx.put(ptx.commitmentTx.txid, ptx);

      // delete ctx mempool data
      const providerMempool = await CtxMempoolProvider.getProvider(asset);
      await providerMempool.del(ptx.commitmentTx.txid);

      try {
        // delete ctx new data (if we didnt create this ptx) clear
        const providerCtxNew = await CtxNewProvider.getProvider(asset);
        await providerCtxNew.del(ptx.commitmentTx.txid);
      } catch {}

      return res.status(200).send({ status: true });
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },
};
