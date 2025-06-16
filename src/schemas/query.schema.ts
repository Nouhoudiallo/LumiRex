import z from "zod";

export const querySchema = z.object({
  question: z
    .string()
    .min(2, "votre question doit au moins faire plus de 2 caractères")
    .trim(),
});

export const loginSchema = z.object({
  email: z.string().email("Veuillez insérer une adresse email valide"),
  password: z
    .string()
    .trim()
    .min(8, "Le mot de passe doit faire au moins 8 caractères")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
});

export const registerSchema = z.object({
  email: z.string().email("Veuillez insérer une adresse email valide").trim(),
  userName: z.string().trim(),
  password: z
    .string()
    .trim()
    .min(8, "Le mot de passe doit faire au moins 8 caractères")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
});
