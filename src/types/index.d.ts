import { querySchema } from "../schemas/query.schema";

declare type Auth = {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
}

export type ChatFormType = z.infer<typeof querySchema>;