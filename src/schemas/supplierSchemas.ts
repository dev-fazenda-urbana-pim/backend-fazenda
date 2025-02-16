import { z } from 'zod';

const supplierSchemaCreate = z.object({
  body: z.object({
    socialReason: z.string()
      .min(1, { message: "Razão Social é obrigatória" }),
    cnpj: z.string()
      .min(1, { message: "CNPJ é obrigatório" })
      .length(14, { message: "CNPJ deve ter exatamente 14 caracteres" })
      .regex(/^\d{14}$/, { message: "CNPJ deve conter apenas números" }),
    uf: z.string()
      .min(1, { message: "UF é obrigatório" })
      .length(2, { message: "UF deve ter exatamente 2 caracteres" })
      .regex(/^[A-Z]{2}$/, { message: "UF deve conter apenas letras maiúsculas" }),
  })
});

const supplierSchemaUpdate = z.object({
  params: z.object({
    supplierId: z.string()
      .min(1, { message: "Id é obrigatório" })
      .uuid({ message: "Id inválido" })
  }),
  body: z.object({
    socialReason: z.string()
      .min(1, { message: "Razão Social é obrigatória" }),
    cnpj: z.string()
      .min(1, { message: "CNPJ é obrigatório" })
      .length(14, { message: "CNPJ deve ter exatamente 14 caracteres" })
      .regex(/^\d{14}$/, { message: "CNPJ deve conter apenas números" }),
    uf: z.string()
      .min(1, { message: "UF é obrigatório" })
      .length(2, { message: "UF deve ter exatamente 2 caracteres" })
      .regex(/^[A-Z]{2}$/, { message: "UF deve conter apenas letras maiúsculas" }),
    status: z.enum(["ATIVO", "INATIVO"], { message: "Status inválido" })
  })
})

export { supplierSchemaCreate, supplierSchemaUpdate };
