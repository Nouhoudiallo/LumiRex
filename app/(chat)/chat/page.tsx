"use client";
import { useState } from "react";
import Input from "@/src/components/chat-input";

const page = () => {
  const [value, setValue] = useState("");

  const sendQuestion = async () => {
    console.log("ok");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Comment puis-je vous aider ?</h1>
      </div>
      <Input
        inputProps={{
          value: value,
          onChange: (e) => setValue(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && sendQuestion()
            
        }}
        buttonProps={{
          onClick: sendQuestion,
        }}
      />
    </div>
  );
};



export default page;
