import { NextFunction, Request, Response } from "express";

function requestLogger(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // console.log("INICIANDO o middleware");

  console.log(
    `${new Date().toISOString()} | ${request.method} ${request.path}`
  );

  response.setHeader("X-Current-Date", new Date().toISOString());

  next();
}

export default requestLogger;
