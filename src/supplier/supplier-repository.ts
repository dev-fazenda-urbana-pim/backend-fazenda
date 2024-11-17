import { prisma } from "src/prisma/prismaClient";

interface CreateSupplierRepositoryParams {
  socialReason: string;
  cnpj: string;
  uf: string;
}

interface UpdateSupplierRepositoryParams extends CreateSupplierRepositoryParams {
  supplierId: string;
  status: "ATIVO" | "INATIVO";
}

class SupplierRepository {
  async getSuppliers() {
    return await prisma.fornecedor.findMany();
  }

  async getSupplierByCnpj(cnpj: string) {
    return await prisma.fornecedor.findUnique({
      where: {
        cnpj
      }
    });
  }

  async createSupplier({ socialReason, cnpj, uf }: CreateSupplierRepositoryParams) {
    return await prisma.fornecedor.create({
      data: {
        razao_social: socialReason,
        cnpj,
        uf,
      }
    });
  }

  async updateSupplier({ supplierId, socialReason, cnpj, uf, status }: UpdateSupplierRepositoryParams) {
    return await prisma.fornecedor.update({
      where: { id: supplierId },
      data: {
        razao_social: socialReason,
        cnpj,
        uf,
        status
      }
    });
  }
}

export default new SupplierRepository();