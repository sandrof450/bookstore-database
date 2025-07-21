import { Router } from "express";

import CategoryController from "../controllers/category-controller";

const categoryRouter = Router();

categoryRouter.post("/api/categories", CategoryController.createCategory);
categoryRouter.get("/api/categories", CategoryController.listCategories);

export default categoryRouter;
