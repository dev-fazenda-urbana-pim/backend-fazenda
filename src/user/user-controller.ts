import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { Roles } from "../@types/roles";
import { isValidUUID } from "../utils/isValidUUID";
import UserRepository from "./user-repository";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body

    const userAlredyExists = await UserRepository.findUserByEmail(email)

    if (userAlredyExists) {
      return response.status(409).send({ message: "Usuário já cadastrado" })
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const newUser = await UserRepository.createUser({
      name, email, hashedPassword
    })

    const accessToken = UserController.generateAccessToken(newUser.id, newUser.role);

    return response.status(201).send({
      message: "Usuário cadastrado com sucesso",
      accessToken
    })
  }

  async me(request: Request, response: Response) {
    const user = await UserRepository.findUserById(request.user_id)

    if (!user) {
      return response.status(404).send({ message: "Usuário não encontrado" })
    }

    return response.send(user)
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      return response.status(404).send({ message: "Usuário não encontrado" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha);

    if (!isPasswordValid) {
      return response.status(401).send({ message: "Senha inválida" })
    }

    const accessToken = UserController.generateAccessToken(user.id, user.role);

    return response.send({
      message: "Usuário logado com sucesso",
      accessToken
    })
  }

  async update(request: Request, response: Response) {
    const { name, email } = request.body
    const { userId } = request.params

    const uuidIsValid = isValidUUID(userId)

    if (!uuidIsValid) {
      return response.status(400).send({ message: "Id inválido" })
    }

    await UserRepository.updateUser({
      userId, name, email
    })

    return response.status(202).send({ message: "Usuário atualizado com sucesso" })
  }

  private static generateAccessToken(userId: string, role: Roles) {
    const token = sign(
      { userId, role },
      process.env.JWT_SECRET as string,
      {
        subject: userId,
        expiresIn: "1d",
      }
    )

    return token
  }
}

export default new UserController()