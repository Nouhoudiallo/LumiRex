import { z } from "zod";

export const SignInSchema = z.object({
    email: z.string().email("Veuillez entrer un email valide").trim().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Format d'email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre"),
})

export const SignUpSchema = z.object({
    email: z.string().email("Veuillez entrer un email valide").trim().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Format d'email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre"),
    
})

export type SignInSchemaType = z.infer<typeof SignInSchema>;