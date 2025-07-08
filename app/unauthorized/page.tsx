// app/unauthorized/page.tsx
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Accès refusé – LumiRexChat",
};

export default function UnauthorizedPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center px-4  text-center">
      <div className="rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-200">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full text-red-600">
            <AlertTriangle className="size-10" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Accès refusé</h1>
        <p className="text-muted-foreground mb-6">
          Vous n'avez pas les droits nécessaires pour accéder à cette page.
        </p>
        <Button asChild className="w-full">
          <Link href="/">Retour à l’accueil</Link>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-6">
        LumiRexChat – Sécurité & Intelligence pour l’Afrique 🌍
      </p>
    </div>
  );
}
