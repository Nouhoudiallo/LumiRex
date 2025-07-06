"use client";
import Wrapper from "@/src/components/wrapper";
import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/src/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SignInSchema,
  SignInSchemaType,
  SignUpSchema,
} from "@/src/schemas/form.schema";
import { string, z } from "zod";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {  useRouter } from "next/navigation";
import { useUserStore } from "@/src/store/user-store";

const AuthPage = () => {
  const [type, setType] = useState<boolean>(false);
  const changeType = () => {
    setType(!type);
  };
  return (
    <Wrapper className="flex items-center justify-center">
      {type ? (
        <SignInForm onClick={changeType} />
      ) : (
        <SignUpForm onClick={changeType} />
      )} 
    </Wrapper>
  );
};

interface Type {
  onClick: () => void;
}

const SignInForm = ({ onClick }: Type) => {
  const [ispending, starttransition] = useTransition();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: SignInSchemaType) {
    starttransition(async () => {
      const add = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })

      const res = await add.json()

      if(res.error){
        toast.error(res.error)
        return
      }

      toast.success(res.message)
      router.push("/chat")
    });
  }

  return (
    <Card className="w-full max-w-md mx-4">
      <CardHeader>
        <CardTitle>
          <h1 className="text-3xl text-center text-primary">Connexion</h1>
        </CardTitle>
        <CardDescription>
          Entrez vos identifiant pour vous connecter{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={ispending}
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      disabled={ispending}
                      type="password"
                      placeholder="*****"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={ispending}
              type="submit"
              className="cursor-pointer w-full"
            >
              {ispending ? (
                <Loader2 size={16} className="size-6 animate-spin" />
              ) : (
                <span>Se connecter</span>
              )}
            </Button>
          </form>
        </Form>
        <div className="flex items-center">
          <span>Vous n'avez pas de compte?</span>
          <Button
            onClick={onClick}
            variant="link"
            size="lg"
            className="cursor-pointer"
          >
            s'inscrire
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const SignUpForm = ({ onClick }: Type) => {
  const [ispending, starttransition] = useTransition();
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: SignInSchemaType) {
    starttransition(async () => {
      const add = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })

      const res = await add.json()

      if(res.error){
        toast.error(res.error)
        return
      }

      toast.success(res.message)
      router.push("/chat")
    });
  }

  return (
    <Card className="w-full max-w-md mx-4">
      <CardHeader>
        <CardTitle>
          <h1 className="text-3xl text-primary">Inscription</h1>
        </CardTitle>
        <CardDescription>
          Entrez vos identifiant pour vous créer un compte{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={ispending}
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      disabled={ispending}
                      type="password"
                      placeholder="*****"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={ispending}
              type="submit"
              className="cursor-pointer w-full"
            >
              {ispending ? (
                <Loader2 size={16} className="size-6 animate-spin" />
              ) : (
                <span>S'inscrire</span>
              )}
            </Button>
          </form>
        </Form>
        <div className="flex items-center">
          <span>Vous avez un compte?</span>
          <Button
            onClick={onClick}
            variant="link"
            size="lg"
            className="cursor-pointer"
          >
            se connecter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthPage;
