"use client";
import { useRef, useState } from "react";
import ChatInput from "../../components/chat-input";
import { ArrowUp, ClipboardCopyIcon, Loader } from "lucide-react";
import { SendMessage } from "@/src/actions/send-question";
import ReactMarkdown from "react-markdown";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";

export default function ChatConversationPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {};

  const copyToClipboard = (text: string) => {};

 const sendMessage = async () => {
    if (!input.trim()) return;

    // Ajouter un message temporaire pour l'utilisateur
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Ajouter un message temporaire pour le bot
    const botPlaceholder = {
      sender: "bot",
      text: "Le bot est en train de répondre...",
    };
    setMessages((prev) => [...prev, botPlaceholder]);
    scrollToBottom(); // Défilement après l'ajout des messages temporaires

    try {

      const postData = await SendMessage(input,"", "");
      // Vérifier si la réponse contient une erreur
      if (postData ) {
         {/* Ceci est un commentaire JSX */}
        console.log("Erreur dans la réponse du bot:", postData);
        // toast.error("Erreur lors de l'envoi du message ou réponse vide.");
        setMessages((prev) => prev.slice(0, -1)); // Supprimer le placeholder du bot
        // supprimer le message de l'utilisateur
        setMessages((prev) => prev.slice(0, -1)); // Supprimer le message de l'utilisateur
        return;
      }
      const botData = postData || "Réponse indisponible.";

      // Remplacer le placeholder par la réponse réelle du bot
      const botMessage = { sender: "assistant", text: botData };
      setMessages((prev) => [...prev.slice(0, -1), botMessage]);
      scrollToBottom(); // Défilement après la réponse du bot
    } catch (error) {
      // toast.error("Erreur lors de l'envoi du message.");
      setMessages((prev) => prev.slice(0, -1)); // Supprimer le placeholder du bot
    }
  };

  return (
    <div className="w-full flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        {/* Ici s'afficheront les messages de la conversation */}
        <div className="flex-grow flex flex-col items-center w-full p-4 overflow-y-auto scrollbar-hide scroll-container">
          <div className="flex flex-col w-full max-w-[900px] space-y-4">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex w-full ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`relative p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-zinc-900 text-white max-w-[75%]"
                        : " text-white max-w-full"
                    }`}
                  >
                    <div className="break-words space-y-2 mb-3">
                      {message.text === "Le bot est en train de répondre..." ? (
                        <span className="relative flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 animate-ping"></span>
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                        </span>
                      ) : (
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      )}
                    </div>
                    {/* Bouton de copie en dessous */}
                    {message.text !== "Le bot est en train de répondre..." && (
                      <div className=" flex justify-end mt-6 ">
                        <button
                          onClick={() => copyToClipboard(message.text)}
                          className="text-gray-400 hover:text-gray-200 cursor-pointer"
                          aria-label="Copier le message"
                        >
                          <ClipboardCopyIcon size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <Loader
                  className="animate-spin text-gray-400"
                  size={24}
                  strokeWidth={2}
                  color="currentColor"
                  aria-label="Loading messages..."
                />
              </div>
            )}
            {/* Ici s'afficheront les messages de la conversation */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <Input
      value={input}
      onChange={setInput}
      />
    </div>
  );
}


const Input = ({value, onChange}: { value: string; onChange: (value:string) => void }) => {
  return (
    <div className="w-full bg-neutral-900 rounded-2xl p-4 shadow-lg max-w-3xl">
      <Textarea
        placeholder="Entrez votre question...."
        className="w-full resize-none"
        autoFocus
        value={value}
        onChange={(e)=> onChange(e.target.value)}
      />

      <div className="flex items-center justify-between mt-2">
        <div />
        <Button
          type="submit"
          size={"icon"}
          className="rounded-full cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};