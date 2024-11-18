import { Request, Response } from "express";
import employeesRepository from "./employees-repository";

class EmployeesController {
  async index(request: Request, response: Response) {
    const employees = await employeesRepository.getEmployees();

    if (employees.length === 0) {
      return response.status(404).send({
        message: "Nenhum funcionário cadastrado"
      });
    }

    return response.send(employees);
  }

  async create(request: Request, response: Response) {
    const { responsability, status } = request.body;

    await employeesRepository.create({
      responsability,
      status
    });

    return response.status(201).send({
      message: "Funcionário cadastrado com sucesso"
    });
  }

  async update(request: Request, response: Response) {
    const { employeeId } = request.params;
    const { responsability, status } = request.body;

    const employeeExists = await employeesRepository.getEmployeeById(employeeId);

    if (!employeeExists || employeeExists.id !== employeeId) {
      return response.status(404).send({
        message: "Funcionário inexistente"
      });
    }

    await employeesRepository.update({
      employeeId,
      responsability,
      status
    });

    return response.status(202).send({
      message: "Funcionário atualizado com sucesso"
    });
  }
}

export default new EmployeesController();