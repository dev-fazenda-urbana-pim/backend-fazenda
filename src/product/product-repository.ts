import { prisma } from "../prisma/prismaClient";

interface CreateProductRepositoryParams {
  name: string;
  description: string;
  weight: number;
  price: number;
  quantity: number;
  image: string;
}

class ProductRepository {
  async create({ name, description, weight, price, quantity, image }: CreateProductRepositoryParams) {
    return await prisma.produto.create({
      data: {
        nome: name,
        descricao: description,
        peso: weight,
        preco: price,
        qtd: quantity,
        imagem: image
      }
    })
  }

  async listAll() {
    return await prisma.produto.findMany()
  }

  async remove(productId: string) {
    return await prisma.produto.delete({
      where: {
        id: productId
      }
    })
  }

  async findProductById(productId: string) {
    return await prisma.produto.findUnique({
      where: {
        id: productId
      }
    })
  }
}

export default new ProductRepository()