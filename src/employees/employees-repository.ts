import { EmployeeStatus } from "src/@types/EmployeeStatus";
import { prisma } from "src/prisma/prismaClient";

interface CreateEmployeeRepositoryParams {
  responsability: string;
  status: EmployeeStatus;
}

interface UpdateEmployeeRepositoryParams extends CreateEmployeeRepositoryParams {
  employeeId: string;
}

class EmployeesRepository {
  async getEmployees() {
    return await prisma.funcionario.findMany();
  }

  async create({ responsability, status }: CreateEmployeeRepositoryParams) {
    return await prisma.funcionario.create({
      data: {
        funcao: responsability,
        status
      }
    })
  }

  async getEmployeeById(employeeId: string) {
    return await prisma.funcionario.findUnique({
      where: { id: employeeId }
    })
  }

  async update({ employeeId, responsability, status }: UpdateEmployeeRepositoryParams) {
    return await prisma.funcionario.update({
      where: { id: employeeId },
      data: {
        funcao: responsability,
        status
      }
    })
  }
}

export default new EmployeesRepository();