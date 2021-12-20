import { Router } from "express";
import { ptxController } from "../controllers/ptxController";

const ptxRoutes = Router();

ptxRoutes.route("/:asset").get(ptxController.getAllLastLimit).post(ptxController.post);

ptxRoutes.route("/:asset/:ctxid").get(ptxController.get);

export default ptxRoutes;
