import { Request, Response } from "express";
import productRepository from "./product-repository";

class ProductController {
  async create(request: Request, response: Response) {
    const { name, description, weight, price, quantity, image } = request.body

    await productRepository.create({ name, description, weight, price, quantity, image })

    return response.status(201).send({ message: "Produto cadastrado com sucesso" })
  }

  async index(request: Request, response: Response) {
    const products = await productRepository.listAll()

    if (products.length === 0) {
      return response.status(404).send({ message: "Nenhum produto cadastrado" })
    }

    return response.send(products)
  }
}

export default new ProductController()