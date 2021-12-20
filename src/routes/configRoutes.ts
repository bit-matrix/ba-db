import { Router } from "express";
import { configController } from "../controllers/configController";

const poolRoutes = Router();

poolRoutes.route("/:asset").get(configController.get);

export default poolRoutes;
