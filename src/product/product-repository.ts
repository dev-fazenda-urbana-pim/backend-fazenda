import { prisma } from "src/prisma/prismaClient";

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
}

export default new ProductRepository()