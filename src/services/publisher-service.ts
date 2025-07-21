import z from "zod";

import { BusinessError } from "../errors/errors";
import { PrismaClient, Publisher } from "../generated/prisma";

export const CreatePublisherSchema = z.object({
  name: z.string().min(3).max(32),
  address: z.string().min(3),
  cellphone: z
    .string()
    .regex(/^\+[0-9]+$/)
    .max(16),
});

class PublisherService {
  static async createPublisher(
    publisherToCreate: Omit<Publisher, "id">
  ): Promise<Publisher> {
    const prisma = new PrismaClient();

    const existingPublisher = await prisma.publisher.findFirst({
      where: {
        OR: [
          {
            address: publisherToCreate.address,
          },
          {
            cellphone: publisherToCreate.cellphone,
          },
        ],
      },
    });

    if (!!existingPublisher) {
      throw new BusinessError("Editora já existente");
    }

    const createdPublisher = await prisma.publisher.create({
      data: publisherToCreate,
    });

    return createdPublisher;
  }

  static async listAllPublishers() {
    const prisma = new PrismaClient();

    const allPublishers = await prisma.publisher.findMany();

    return allPublishers;
  }
}

export default PublisherService;
