import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Pour désactiver ESLint lors du build Next.js, ajoutez dans .env.local :
// NEXT_DISABLE_ESLINT_PLUGIN=true

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", ),
];

export default eslintConfig;

// Toutes les règles personnalisées ESLint ont été supprimées temporairement.