import { NextFunction, Request, Response } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).send({ message: err.message });
  next();
};