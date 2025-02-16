import { z } from "zod";

const productSchemaCreate = z.object({
  body: z.object({
    name: z.string()
      .min(1, { message: "Nome é obrigatório" }),
    description: z.string()
      .min(1, { message: "Descrição é obrigatória" }),
    weight: z.number()
      .min(0.01, { message: "Peso deve ser maior que 0" }),
    price: z.number()
      .min(0.01, { message: "Preço deve ser maior que 0" }),
    quantity: z.number()
      .min(1, { message: "Quantidade deve ser 1 ou maior" }),
    image: z.string()
      .min(1, { message: "Imagem é obrigatória" })
      .url({ message: "Imagem inválida" })
  })
});

const productSchemaDelete = z.object({
  params: z.object({
    productId: z.string()
      .min(1, { message: "Id é obrigatório" })
      .uuid({ message: "Id inválido" })
  })
});

export { productSchemaCreate, productSchemaDelete };
