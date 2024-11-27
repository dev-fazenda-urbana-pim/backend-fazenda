import { Request, Response } from "express";
import { isValidUUID } from "../utils/isValidUUID";
import SupplierRepository from "./supplier-repository";

class SupplierController {
  async index(request: Request, response: Response) {
    const suppliers = await SupplierRepository.getSuppliers();

    if (suppliers.length === 0) {
      return response.status(404).send({ message: "Nenhum fornecedor cadastrado" });
    }

    return response.send(suppliers);
  }

  async create(request: Request, response: Response) {
    const { socialReason, cnpj, uf } = request.body;

    const supplierExists = await SupplierRepository.getSupplierByCnpj(cnpj);

    if (supplierExists) {
      return response.status(409).send({ message: "Fornecedor já cadastrado" });
    }

    await SupplierRepository.createSupplier({ socialReason, cnpj, uf });

    return response.status(201).send({ message: "Fornecedor cadastrado com sucesso" });
  }

  async update(request: Request, response: Response) {
    const { supplierId } = request.params;
    const { socialReason, cnpj, uf, status } = request.body;

    const uuidIsValid = isValidUUID(supplierId);

    if (!uuidIsValid) {
      return response.status(400).send({ message: "Id inválido" });
    }

    const supplierExists = await SupplierRepository.getSupplierByCnpj(cnpj);

    if (supplierId !== supplierExists?.id) {
      return response.status(404).send({ message: "Fornecedor inexistente" });
    }

    await SupplierRepository.updateSupplier({ supplierId, socialReason, cnpj, uf, status });

    return response.status(202).send({ message: "Fornecedor atualizado com sucesso" });
  }
}

export default new SupplierController();