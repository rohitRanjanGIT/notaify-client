import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ErrorAnalysisResponse {
    location: string;
    reason: string;
    solution: string;
}

async function generateErrorAnalysis(
    provider: "openai" | "claude" | "gemini",
    apiKey: string,
    modelName: string,
    errorMessage: string
): Promise<ErrorAnalysisResponse> {
    const prompt = `Analyze this error and provide a brief response in JSON format with three fields: "location" (where the error occurred), "reason" (why it happened), and "solution" (how to fix it). Keep each response concise and developer-friendly.
Error: ${errorMessage}
Respond only with valid JSON.`;

    let response: string;

    if (provider === "openai") {
        const client = new OpenAI({ apiKey });
        const result = await client.chat.completions.create({
            model: modelName,
            messages: [{ role: "user", content: prompt }],
        });
        response = result.choices[0].message.content || "";

    } else if (provider === "claude") {
        const client = new Anthropic({ apiKey });
        const result = await client.messages.create({
            model: modelName,
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt }],
        });
        response =
            result.content[0].type === "text" ? result.content[0].text : "";

    } else if (provider === "gemini") {
        const client = new GoogleGenerativeAI(apiKey);
        const model = client.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        response = result.response.text();
    } else {
        throw new Error(`Unsupported provider: ${provider}`);
    }

    return JSON.parse(response);
}

export { generateErrorAnalysis };
export type { ErrorAnalysisResponse };
