import { z } from 'zod';

export const createUserFormSchema = z.object({
    productName: z.string({
      invalid_type_error: "Nome deve ser um texto",
    })
    .min(1, 'Campo obrigatório'),
    price: z.string()
    .max(6, 'Preço muito alto')
    .regex(/^[0-9]*[.]?[0-9]+$/, "Deve ser um número")
    .min(1, 'Campo obrigatório')
    .includes('.'),
    description: z.string({
      invalid_type_error: "Nome deve ser um texto",
    }),
    category: z.string({
      required_error: "Campo Obrigatório"
    })
})

export type UserFormData = z.infer<typeof createUserFormSchema>