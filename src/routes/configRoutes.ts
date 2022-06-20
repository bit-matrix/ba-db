import { Router } from "express";
import { configController } from "../controllers/configController";

const configRoutes = Router();

configRoutes.route("/").get(configController.get).post(configController.post);

export default configRoutes;
