import { Router } from "express";
import { assetBlockHeightController } from "../controllers/assetBlockHeightController";
import { ctxController } from "../controllers/ctxController";

const assetBlockHeightRoutes = Router();

assetBlockHeightRoutes.route("/:asset").get(assetBlockHeightController.get);

assetBlockHeightRoutes.route("/:asset/:type").post(assetBlockHeightController.post);

export default assetBlockHeightRoutes;
