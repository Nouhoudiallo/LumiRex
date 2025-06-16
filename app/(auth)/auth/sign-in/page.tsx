import LoginForm from "@/src/components/login-form/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

function SignInPage() {
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-3xl">Connexion</CardTitle>
        <CardDescription>
          <p className="text-muted-foreground">
            Veillez renseigner vos informations de Connexion pour accèder à
            votre compte{" "}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}

export default SignInPage;
