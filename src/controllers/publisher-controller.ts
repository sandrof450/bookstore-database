import { Request, Response } from "express";

import PublisherService, {
  CreatePublisherSchema,
} from "../services/publisher-service";

class PublisherController {
  static async createPublisher(request: Request, response: Response) {
    const publisherToCreate = CreatePublisherSchema.parse(request.body);

    const createPublisher = await PublisherService.createPublisher(
      publisherToCreate
    );

    response.status(201).json({
      data: createPublisher,
    });
  }

  static async listPublishers(request: Request, response: Response) {
    const publishers = await PublisherService.listAllPublishers();

    response.json({
      data: publishers,
    });

    return;
  }
}

export default PublisherController;
