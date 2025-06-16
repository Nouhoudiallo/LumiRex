"use client"
import React, { useState } from "react";
import { loginSchemaType } from "@/src/types";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "../ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { loginSchema } from "@/src/schemas/query.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const LoginForm: React.FC = () => {
  const [view, setView] = useState<boolean>(false);

  const changeView = () => {
    setView(!view)
  };

  const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: ""
      },
    });
  
    const onSubmit = (values: loginSchemaType) => {
      console.log(values);
      
    }

  return (
    <Form {...form}>
      <form method="POST" className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={view ? "text": "password"}
                />
              </FormControl>
              {view ? (
                <Eye
                  onClick={changeView}
                  className="w-4 h-4 absolute top-8 right-4 cursor-pointer"
                />
              ) : (
                <EyeClosed
                  onClick={changeView}
                  className="w-4 h-4 absolute top-8 right-4 cursor-pointer"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Se connecter</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
