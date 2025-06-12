import z from "zod"

export const querySchema = z.object({
  question: z.string().min(2, "votre question doit au moins faire plus de 2 caractères").trim()
})