import { Request, Response } from "express";
import { isValidUUID } from "../utils/isValidUUID";
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

  async delete(request: Request, response: Response) {
    const { productId } = request.params

    const uuidIsValid = isValidUUID(productId)

    if (!uuidIsValid) {
      return response.status(400).send({ message: "Id inválido" })
    }

    const productExist = await productRepository.findProductById(productId)

    if (!productExist) {
      return response.status(404).send({ message: "Produto não encontrado" })
    }

    await productRepository.remove(productId)

    return response.send({ message: "Produto removido com sucesso" })
  }
}

export default new ProductController()