import { Router } from "express";
import { ctxController } from "../controllers/ctxController";

const ctxRoutes = Router();

ctxRoutes.route("/").get(ctxController.getAllLastLimit).post(ctxController.post);

ctxRoutes.route("/:id").get(ctxController.get);

export default ctxRoutes;
