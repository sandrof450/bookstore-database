import z from "zod";
import { NextFunction, Request, Response } from "express";

import { AuthenticationError, BusinessError } from "./errors";

function customErrorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AuthenticationError) {
    response.status(401).json({
      error: error.message,
    });
    return;
  }

  if (error instanceof BusinessError) {
    response.status(400).json({
      error: error.message,
    });
    return;
  }

  if (error instanceof z.ZodError) {
    response.status(400).json({
      error: "VALIDATION_ERROR",
      data: error.issues,
    });
    return;
  }

  response.status(500).json({
    error: "Internal server error",
  });

  console.error(error.message);
}

export default customErrorHandler;
