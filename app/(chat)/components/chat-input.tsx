import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import React from "react";

interface ChatInputProps {
  inChatPage: boolean;
  setAction?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inChatPage = false,
  setAction,
}) => {
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
      <div className="w-full bg-neutral-900 rounded-2xl p-4 shadow-lg max-w-3xl">
        <Textarea
          className="w-full min-h-16 max-h-72 resize-none"
          placeholder="Posez votre question..."
        />
        <div className="flex items-center justify-between mt-2">
          <div />
          <Button size={"icon"} className="rounded-full cursor-pointer">
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
