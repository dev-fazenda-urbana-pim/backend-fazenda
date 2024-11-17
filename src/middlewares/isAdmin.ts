import { NextFunction, Request, Response } from "express"
import { currentRole } from "./currentRole"

export function isAdmin(request: Request, response: Response, next: NextFunction) {
  const currentUserRole = currentRole(request, response)

  if (currentUserRole !== "Admin") {
    return response.status(401).send({ message: "Not Authorized" })
  }

  return next()
}
