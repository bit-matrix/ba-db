import { Router } from "express";
import { poolController } from "../controllers/poolController";

const poolRoutes = Router();

poolRoutes.route("/").get(poolController.getAll);

poolRoutes.route("/:asset").get(poolController.get);

export default poolRoutes;
