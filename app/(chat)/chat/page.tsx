"use client";
import { useState } from "react";
import Input from "@/src/components/chat-input";
import { getUser } from "@/src/actions/user.action";
import { toast } from "sonner";
import { createDiscussion } from "@/src/actions/send-question";
import { redirect } from "next/navigation";

const page = () => {
  const [value, setValue] = useState("");
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const sendQuestion = async () => {
    try {
      const { error, user, message } = await getUser();

      if(error || !user){
        toast.error(message)
        return
      }

      const discu = await createDiscussion(user?.id, value)
      console.log(discu);

      if(!discu.discussion){
        toast.error("une erreur est suvenue ")
        return
      }

      redirect(`/chat/${discu.discussion.id}`)
      
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Comment puis-je vous aider ?</h1>
      </div>
      <Input
        inputProps={{
          value: value,
          onChange: (e) => {
            setValue(e.target.value);
            if (value.length >= 1) {
              setIsEmpty(false);
            }
          },
          onKeyDown: (e) => e.key === "Enter" && sendQuestion(),
        }}
        buttonProps={{
          onClick: sendQuestion,
          disabled: isEmpty,
        }}
      />
    </div>
  );
};

export default page;
