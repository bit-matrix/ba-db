import { Router } from "express";
import { ctxController } from "../controllers/ctxController";

const ctxRoutes = Router();

ctxRoutes.route("/:asset").get(ctxController.getAllLastLimit).post(ctxController.post);

ctxRoutes.route("/:asset/:txid").get(ctxController.get).delete(ctxController.delete);

export default ctxRoutes;
