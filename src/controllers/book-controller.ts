import { Request, Response } from "express";
import BookService, {
  CreateBookSchema,
  UpdateBookSchema,
} from "../services/book-service";

class BookController {
  static async createBook(request: Request, response: Response) {
    const bookToCreate = CreateBookSchema.parse(request.body);

    const createBook = await BookService.createBook(bookToCreate);

    response.status(201).json({
      data: createBook,
    });
  }

  static async listBooks(request: Request, response: Response) {
    const books = await BookService.listAllBooks();

    response.json({
      data: books,
    });
  }

  static async getBook(request: Request, response: Response) {
    const { id } = request.params;

    const book = await BookService.getBookById(id);

    response.json({
      data: book,
    });
  }

  static async updateBook(request: Request, response: Response) {
    const { id } = request.params;
    const bookToUpdate = UpdateBookSchema.parse(request.body);

    const updatedBook = await BookService.updateBook(id, bookToUpdate);

    if (!updatedBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    response.json({
      data: updatedBook,
    });
  }

  static async deleteBook(request: Request, response: Response) {
    const { id } = request.params;

    await BookService.deleteBook(id);

    response.status(204).send();
  }
}

export default BookController;
