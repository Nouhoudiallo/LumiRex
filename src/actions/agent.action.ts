// @ts-ignore
import { createReactAgent } from "@langchain/langgraph/prebuilt";
// @ts-ignore
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { getGeminiModel } from "@/src/lib/models";
import {prisma} from "@/src/lib/db";
import { PrismaChatHistory } from "@/src/methodes/CustomMemorySaver";

// LoadEnv.load();

export async function runAgent(
  threadId: string,
  messages: { role: string; content: string }
): Promise<string> {
  const model = getGeminiModel();
  const chatHistory = new PrismaChatHistory(prisma, threadId);
  const memorySaver = new MemorySaver();

  

  const agent = createReactAgent({
    llm: model,
    prompt:`Tu es un agent d'étude, tu dois répondre aux questions de l'utilisateur en te basant sur l'historique de la conversation. Tu peux utiliser des outils si nécessaire, mais tu dois toujours te référer à l'historique pour donner des réponses précises et pertinentes. utilise le tool web_search si tu n'as pas assez d'informations sur la question de l'utilisateur.`,

    tools: [],
    checkpointer: memorySaver,
    preModelHook: async () => {
      const msgs = await chatHistory.getMessages();
      return {
        llmInputMessages: msgs,
      };
    },
  });

  // Ajoute la question de l'utilisateur à l'historique avant l'appel à l'agent
  await chatHistory.addMessages([
    new HumanMessage({ content: messages.content })
  ]);

  const result = await agent.invoke(
    { messages },
    { configurable: { thread_id: threadId } }
  );

  const answer = result.messages.at(-1);
  if (!answer) {
    throw new Error("No answer received from the agent.");
  }
  
  await chatHistory.addMessages([answer]);

  return answer.content.toString();
}