"use client";
import Wrapper from "@/src/components/wrapper";
import React, { useState } from "react";
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
import { z } from "zod";

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

const AuthPage = () => {
  const [type, setType] = useState<boolean>(false);
  const changeType = () => {
    setType(!type)
  }
  return (
    <Wrapper className="flex items-center justify-center">
      {type ? <SignInForm onClick={changeType} /> : <SignUpForm onClick={changeType} />}
    </Wrapper>
  );
};

interface Type {
  onClick: () => void
}

const SignInForm = ({onClick}:Type) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                    <Input placeholder="example@gmail.com" {...field} />
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
                    <Input type="password" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer w-full">
              Se connecter
            </Button>
          </form>
        </Form>
        <div className="flex items-center">
          <span>Vous n'avez pas de compte?</span>
          <Button onClick={onClick} variant="link" size="lg" className="cursor-pointer">
            s'inscrire
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const SignUpForm = ({onClick}:Type) => {
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="w-full max-w-md mx-4">
      <CardHeader>
        <CardTitle>
          <h1 className="text-3xl text-center text-primary">Inscription</h1>
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
                    <Input placeholder="example@gmail.com" {...field} />
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
                    <Input type="password" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer w-full">
              S'inscrire
            </Button>
          </form>
        </Form>
        <div className="flex items-center">
          <span>Vous avez un compte?</span>
          <Button onClick={onClick} variant="link" size="lg" className="cursor-pointer">
            se connecter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthPage;
