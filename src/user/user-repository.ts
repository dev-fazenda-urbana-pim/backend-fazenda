import { prisma } from "src/prisma/prismaClient";

interface CreateUserRepositoryParams {
  name: string;
  email: string;
  hashedPassword: string;
}

interface UpdateUserRepositoryParams extends Pick<CreateUserRepositoryParams, "name" | "email"> {
  userId: string;
}

class UserRepository {
  async createUser({ name, email, hashedPassword }: CreateUserRepositoryParams) {
    return await prisma.usuarios.create({
      data: {
        nome: name,
        email,
        senha: hashedPassword,
      },
    })
  }

  async updateUser({ userId, name, email }: UpdateUserRepositoryParams) {
    return await prisma.usuarios.update({
      where: { id: userId },
      data: {
        nome: name,
        email,
      },
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.usuarios.findUnique({
      where: { email },
    });
  }
}

export default new UserRepository();
