import { Router } from "express";
import { ptxCtxController } from "../controllers/ptxCtxController";

const ptxCtxRoutes = Router();

ptxCtxRoutes.route("/:asset/:ptxid").get(ptxCtxController.get);

export default ptxCtxRoutes;
