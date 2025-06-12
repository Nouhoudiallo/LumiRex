"use client";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { querySchema } from "@/src/schemas/query.schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/src/components/ui/form";
import { SendFirstQuestion, SendMessage } from "@/src/actions/send-question";
import { ChatFormType } from "@/src/types";

interface ChatInputProps {
  onSubmit?: (values: ChatFormType, ...args: any[]) => Promise<void>;
  className?: string;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>; // Ajout des props supplémentaires pour le
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>; // Ajout des props supplémentaires pour le Textarea
  inChatPage: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  className,
  buttonProps,
  inputProps,
  inChatPage = false,
}) => {
  const form = useForm<z.infer<typeof querySchema>>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      question: "",
    },
  });
  return (
    <div
      className={
        inChatPage
          ? "absolute bottom-0 left-0 w-full flex justify-center px-4 pb-4 z-10"
          : "flex flex-col items-center justify-center space-y-6 w-full px-4"
      }
    >
      {!inChatPage && (
        <div>
          <h1 className="text-2xl font-bold">Comment puis-je vous aider ?</h1>
        </div>
      )}
      {form && onSubmit ? (
        <Form {...form}>
          <form
            method="POST"
            onSubmit={onSubmit && form.handleSubmit(onSubmit)}
            className="w-full bg-neutral-900 rounded-2xl p-4 shadow-lg max-w-3xl"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Entrez votre question...."
                      className="w-full resize-none"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between mt-2">
              <div />
              <Button
                type="submit"
                size={"icon"}
                className="rounded-full cursor-pointer"
                {...buttonProps}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="w-full bg-neutral-900 rounded-2xl p-4 shadow-lg max-w-3xl">
          <Textarea
            placeholder="Entrez votre question...."
            className="w-full resize-none"
            autoFocus
            {...inputProps}
          />

          <div className="flex items-center justify-between mt-2">
            <div />
            <Button
              type="submit"
              size={"icon"}
              className="rounded-full cursor-pointer"
              {...buttonProps}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
