import { Router } from "express";
import { ptxController } from "../controllers/ptxController";

const ptxRoutes = Router();

ptxRoutes.route("/").get(ptxController.getAllLastLimit).post(ptxController.post);

ptxRoutes.route("/:id").get(ptxController.get);

export default ptxRoutes;
