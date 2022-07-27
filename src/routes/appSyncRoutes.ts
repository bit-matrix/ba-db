import { Router } from "express";
import { appSyncController } from "../controllers/appSyncController";

const appSyncRoutes = Router();

appSyncRoutes.route("/").get(appSyncController.get).post(appSyncController.post);

export default appSyncRoutes;
