import { Router } from "express";
import { appSyncController } from "../controllers/appSyncController";

const appSyncRoutes = Router();

appSyncRoutes.route("/").post(appSyncController.post);

appSyncRoutes.route("/:appId").get(appSyncController.get);

export default appSyncRoutes;
