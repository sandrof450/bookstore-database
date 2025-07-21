import z from "zod";
import bcryptjs from "bcryptjs";

import { User, PrismaClient } from "../generated/prisma";

import { BusinessError } from "../errors/errors";

/**
 * Zero values: Valores padrão de um determinado tipo de dados
 *
 * Number -> 0
 * Boolean -> False
 * String -> ""
 * Object -> NULL
 */

// Schema do Zod
export const CreateUserSchema = z.object({
  name: z.string().min(3).max(24),
  surname: z.string().min(3).max(32),
  email: z.email({ pattern: /.@fiap\.com\.br/ }).max(96),
  password: z.string().min(6),
});

// ignorando a prop "id"
// type CreateUserType = Omit<User, "id">;

class UserService {
  static async createUser(userToCreate: Omit<User, "id">): Promise<User> {
    const prisma = new PrismaClient();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: userToCreate.email,
      },
    });

    // Truthy (true) & Falsy (false)
    if (!!existingUser) {
      throw new BusinessError("Usuário já existente");
    }

    userToCreate.password = bcryptjs.hashSync(
      userToCreate.password,
      bcryptjs.genSaltSync(8)
    );

    const createdUser = await prisma.user.create({
      data: userToCreate,
    });

    createdUser.password = "";

    return createdUser;
  }

  static async listAllUsers() {
    const prisma = new PrismaClient();

    const allUsers = await prisma.user.findMany({
      omit: { password: true },
    });

    return allUsers;
  }
}

export default UserService;
