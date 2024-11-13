import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface Payload2 {
  id: string
  email: string
  role: string
}

export const isAdmin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authToken = request.headers.authorization as string

  const [, token] = authToken.split(" ")

  const { role } = verify(token, process.env.JWT_SECRET as string) as Payload2

  if (role !== "admin") {
    return response.status(401).send({ message: "Not Authorized" })
  }
  return next()
}
