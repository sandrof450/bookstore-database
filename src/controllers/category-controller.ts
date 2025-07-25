import { Request, Response } from "express";

import CategoryService, {
  CreateCategorySchema,
} from "../services/category-service";

class CategoryController {
  static async createCategory(request: Request, response: Response) {
    const categoryToCreate = CreateCategorySchema.parse(request.body);

    const createCategory = await CategoryService.createCategory(
      categoryToCreate
    );

    response.status(201).json({
      data: createCategory,
    });

    return;
  }

  static async listCategories(request: Request, response: Response) {
    const categories = await CategoryService.listAllCategories();

    response.json({
      data: categories,
    });

    return;
  }
}

export default CategoryController;
