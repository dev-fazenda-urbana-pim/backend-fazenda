import { Request, Response } from "express"
import { JsonWebTokenError, verify } from "jsonwebtoken"
import { Roles } from "src/@types/roles"

interface Payload {
  id: string
  email: string
  role: Roles
}

export function currentRole(request: Request, response: Response) {
  const authToken = request.headers.authorization as string

  try {
    if (!authToken) {
      throw new JsonWebTokenError("Token not found")
    }

    const [, token] = authToken.split(" ")

    const { role } = verify(token, process.env.JWT_SECRET as string) as Payload

    return role
  } catch (error: JsonWebTokenError | any) {
    if (error instanceof JsonWebTokenError) {
      return response.status(401).send({ message: error.message })
    }

    response.status(500).send({ message: "Internal Server Error" })
  }
}