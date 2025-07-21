import { Router } from "express";

import BookController from "../controllers/book-controller";

const bookRouter = Router();

bookRouter.post("/api/books", BookController.createBook);
bookRouter.get("/api/books", BookController.listBooks);
bookRouter.get("/api/books/:id", BookController.getBook);
bookRouter.put("/api/books/:id", BookController.updateBook);
bookRouter.delete("/api/books/:id", BookController.deleteBook);

export default bookRouter;
