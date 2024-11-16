import { Request, Response } from "express";
import productRepository from "./product-repository";

class ProductController {
  async create(request: Request, response: Response) {
    const { name, description, weight, price, quantity, image } = request.body

    await productRepository.create({ name, description, weight, price, quantity, image })

    return response.status(201).send({ message: "Produto cadastrado com sucesso" })
  }
}

export default new ProductController()