import { Router } from "express";

import PublisherController from "../controllers/publisher-controller";

const publisherRouter = Router();

publisherRouter.post("/api/publishers", PublisherController.createPublisher);
publisherRouter.get("/api/publishers", PublisherController.listPublishers);

export default publisherRouter;
