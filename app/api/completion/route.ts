import { runAgent } from "@/src/actions/agent.action";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res : NextResponse) {
    try {
        
        const { message, userId, discussionId } = await request.json();

        if (!message || !userId || !discussionId) {
            return NextResponse.json({ error: "Field is required" }, { status: 400 });
        }
        
        // Here you would typically call your AI service to get the completion
        // For example:
        // const response = await aiService.getCompletion(messages, model);

        const question = {
            role: "user",
            content: message
        }

        const agent = await runAgent(discussionId, question )

        

        return NextResponse.json(agent);

    } catch (error) {
        console.error("Error in POST /api/completion:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}