import ChatInput from "../../components/chat-input";

export default function ChatConversationPage() {
  return (
    <div className="w-full flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        {/* Ici s'afficheront les messages de la conversation */}
      </div>
      <ChatInput inChatPage={true} />
    </div>
  )
}
