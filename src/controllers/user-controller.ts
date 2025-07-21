import { Request, Response } from "express";

import UserService, { CreateUserSchema } from "../services/user-service";

// export function createUser(request: Request, response: Response) {
//   return
// }

/**
 * Vale a pena eu depender do prisma? Meu app pode ficar acoplado a ele?
 *
 * => É um projeto de estudo. Pode sim
 */
class UserController {
  static async createUser(request: Request, response: Response) {
    // parse do body para o formato do schema
    const userToCreate = CreateUserSchema.parse(request.body);

    const createdUser = await UserService.createUser(userToCreate);

    response.status(201).json({
      data: createdUser,
    });
  }

  static async listUsers(request: Request, response: Response) {
    const users = await UserService.listAllUsers();

    response.json({
      data: users,
    });

    return;
  }
}

export default UserController;
