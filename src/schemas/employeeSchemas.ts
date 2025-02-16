import { z } from "zod";

const employeeSchemaCreate = z.object({
  body: z.object({
    responsability: z.string(),
    status: z.enum(["ATIVO", "INATIVO"]).default("ATIVO"),
  })
});

const employeeSchemaUpdate = z.object({
  params: z.object({
    employeeId: z.string()
      .min(1, { message: "Id do funcionário é obrigatório" })
      .uuid({ message: "Id inválido" })
  }),
  body: z.object({
    responsability: z.string().optional(),
    status: z.enum(["ATIVO", "INATIVO"], { message: "Status inválido" }),
  })
});

export { employeeSchemaCreate, employeeSchemaUpdate };

