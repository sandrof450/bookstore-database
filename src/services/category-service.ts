import z from "zod";

import { BusinessError } from "../errors/errors";
import { PrismaClient, Category } from "../generated/prisma";

export const CreateCategorySchema = z.object({
  name: z.string().min(3).max(24),
});

class CategoryService {
  static async createCategory(
    categoryToCreate: Omit<Category, "id">
  ): Promise<Category> {
    const prisma = new PrismaClient();

    const existingCategory = await prisma.category.findFirst({
      where: {
        name: {
          equals: categoryToCreate.name,
          mode: "insensitive",
        },
      },
    });

    // if (existingCategory !== null) {
    if (!!existingCategory) {
      throw new BusinessError("Category already exists");
    }

    const createdCategory = await prisma.category.create({
      data: categoryToCreate,
    });

    return createdCategory;
  }

  static async listAllCategories() {
    const prisma = new PrismaClient();

    const allCategories = await prisma.category.findMany();

    return allCategories;
  }
}

export default CategoryService;
