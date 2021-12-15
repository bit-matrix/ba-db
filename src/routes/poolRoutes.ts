import { Router } from "express";
import { poolController } from "../controllers/poolController";

const poolRoutes = Router();

poolRoutes.route("/").get(poolController.getAll);

poolRoutes.route("/:id").get(poolController.get);

export default poolRoutes;
