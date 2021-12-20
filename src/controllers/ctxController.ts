import { NextFunction, Request, Response } from "express";
import { CtxMempoolProvider } from "../providers/TxProviders/CtxMempoolProvider";
import { CtxNewProvider } from "../providers/TxProviders/CtxNewProvider";
import { PtxCtxProvider } from "../providers/TxProviders/PtxCtxProvider";
import { isPoolAsset } from "./common";
import { BmCtxMempool, BmCtxNew } from '@bitmatrix/models'

export const ctxController = {
  getAllLastLimit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const limit: number = Number(req.query.limit || 10);
      const mempool: boolean = req.query.mempool === "true";

      if (mempool) {
        const provider = await CtxMempoolProvider.getProvider(asset);
        const result: BmCtxMempool[] = await provider.getMany(limit);
        return res.status(200).send(result);
      } else {
        const provider = await CtxNewProvider.getProvider(asset);
        const result: BmCtxNew[] = await provider.getMany(limit);
        return res.status(200).send(result);
      }
    } catch (error) {
      return res.status(501).send({ status: false, error });
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const txid = req.params.txid;
      if (txid.length !== 64) return res.status(501).send({ status: false, error: "Invalid tx id" });

      const isMempool: boolean = req.query.mempool === "true";

      if (!isMempool) {
        const provider = await CtxNewProvider.getProvider(asset);
        const result = await provider.get(txid);
        return res.status(200).send(result);
      } else {
        const provider = await CtxMempoolProvider.getProvider(asset);
        const result = await provider.get(txid);
        return res.status(200).send(result);
      }
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asset = req.params.asset;
      await isPoolAsset(asset);

      const providerNew = await CtxNewProvider.getProvider(asset);

      if (req.body.poolTxid === undefined) {
        // create new ctx data
        const ctxNew = <BmCtxNew>req.body;
        await providerNew.put(ctxNew.commitmentTx.txid, ctxNew);
        return res.status(200).send({ status: true });
      } else {
        const ctxMempool = <BmCtxMempool>req.body;

        // create ctx mempool data
        const providerMempool = await CtxMempoolProvider.getProvider(asset);
        await providerMempool.put(ctxMempool.commitmentTx.txid, ctxMempool);

        // delete new ctx data
        await providerNew.del(ctxMempool.commitmentTx.txid);

        /* const providerPtxCtx = await PtxCtxProvider.getProvider(asset);
        const currentCtxs = await providerPtxCtx.get(ctxMempool.poolTxid);
        let newCtxs: string[] = [ctxMempool.commitmentTx.txid];
        if (currentCtxs) {
          newCtxs = [...currentCtxs.commitmentTxs, ...newCtxs];
        }
        await providerPtxCtx.put(ctxMempool.poolTxid, { poolTxid: ctxMempool.poolTxid, commitmentTxs: newCtxs }); */

        return res.status(200).send({ status: true });
      }
    } catch (error) {
      res.status(501).send({ status: false, error });
    }
  },
};
