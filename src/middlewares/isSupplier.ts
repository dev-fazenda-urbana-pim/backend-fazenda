import { NextFunction, Request, Response } from "express"
import { currentRole } from "./currentRole"

export function isSupplier(request: Request, response: Response, next: NextFunction) {
  const currentUserRole = currentRole(request)

  if (currentUserRole !== "Fornecedor") {
    return response.status(401).send({ message: "Not Authorized" })
  }

  return next()
}
