/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcryptjs"
import { Request, Response, Router } from "express"
import { prisma } from "./prisma/prismaClient"

const router = Router()

router.post("/user/register", async (request: Request, response: Response) => {
  const { name, email, password } = request.body

  if (!name || !email || !password) {
    return response.status(400).send({ message: "Todos os campos são obrigatórios" })
  }

  const hashedPassword = await bcrypt.hash(password, 8)

  await prisma.usuarios.create({
    data: {
      nome: name,
      email,
      senha: hashedPassword,
    },
  })

  return response.status(201).send({ message: "Usuário cadastrado com sucesso" })
})

router.patch(
  "/user/update/:userId",
  async (request: Request, response: Response) => {
    console.log("/user/update/:userId")
  }
)

router.post("/user/session", async (request: Request, response: Response) => {
  console.log("/user/session")
})

router.get(
  "/user/find/:userId",
  async (
    request: Request,
    response: Response
  ) => {
    console.log("/user/find/:userId", request.params.userId)
  }
)

export { router }
