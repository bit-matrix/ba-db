import { Router } from "express";
import { clearController } from "../controllers/clearController";

const clearRoutes = Router();

clearRoutes.route("/:asset").delete(clearController.delete);

export default clearRoutes;
