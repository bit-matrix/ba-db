import { Router } from "express";
import { assetBlockHeightController } from "../controllers/assetBlockHeightController";
import { ctxController } from "../controllers/ctxController";

const assetBlockHeightRoutes = Router();

assetBlockHeightRoutes.route("/:id").get(assetBlockHeightController.get);

assetBlockHeightRoutes.route("/:id/:type").post(assetBlockHeightController.post);

export default assetBlockHeightRoutes;
