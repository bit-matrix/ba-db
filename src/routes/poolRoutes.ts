import { Router } from "express";
import { poolController } from "../controllers/poolController";

const poolRoutes = Router();

poolRoutes.route("/").get(poolController.getAll).post(poolController.post);

poolRoutes.route("/:asset").get(poolController.get).delete(poolController.del);

export default poolRoutes;
