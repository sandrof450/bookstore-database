import z from "zod";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { PrismaClient } from "../generated/prisma";

import { AuthenticationError } from "../errors/errors";

type CreateSessionParams = {
  email: string;
  password: string;
};

class SessionService {
  static async createSession(params: CreateSessionParams): Promise<string> {
    const prisma = new PrismaClient();

    const foundUser = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
    });

    if (!foundUser) {
      throw new AuthenticationError("User not found");
    }

    const passwordsMatch = bcryptjs.compareSync(
      params.password,
      foundUser.password
    );

    if (!passwordsMatch) {
      throw new AuthenticationError(
        "Combination e-mail/password does not match"
      );
    }

    const token = jwt.sign(
      {
        sub: foundUser.id,
        user_name: foundUser.name,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "10m",
      }
    );

    return token;
  }
}

export default SessionService;
