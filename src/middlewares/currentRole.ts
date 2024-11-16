import { Request } from "express"
import { verify } from "jsonwebtoken"
import { Roles } from "src/@types/roles"

interface Payload {
  id: string
  email: string
  role: Roles
}

export function currentRole(request: Request) {
  const authToken = request.headers.authorization as string

  const [, token] = authToken.split(" ")

  const { role } = verify(token, process.env.JWT_SECRET as string) as Payload

  return role
}