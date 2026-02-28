import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";

export interface ErrorAnalysisResponse {
    location: string;
    reason: string;
    solution: string;
    statusCode?: string | number;
    errorType?: string;
}

export async function generateErrorAnalysis(
    provider: "openai" | "claude" | "google",
    apiKey: string,
    modelName: string,
    errorMessage: string
): Promise<ErrorAnalysisResponse> {
    const prompt = `Analyze this error and provide a brief response in JSON format with five fields: "location" (where the error occurred), "reason" (why it happened), "solution" (how to fix it), "statusCode" (HTTP status code or generic error code related to this if any, otherwise "N/A"), and "errorType" (type of error, e.g., TypeError, MongoError, etc). Keep each response concise and developer-friendly.
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
        response = result.content[0].type === "text" ? result.content[0].text : "";
    } else if (provider === "google") {
        const client = new GoogleGenerativeAI(apiKey);
        const model = client.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        response = result.response.text();
    } else {
        throw new Error(`Unsupported provider: ${provider}`);
    }

    // Robust string cleanup and JSON extraction
    response = response.replace(/```json/g, '').replace(/```/g, '').trim();

    // Attempt to extract from the first { to the last }
    const startIndex = response.indexOf('{');
    const endIndex = response.lastIndexOf('}');

    let jsonStr = response;
    if (startIndex !== -1 && endIndex !== -1 && endIndex >= startIndex) {
        jsonStr = response.substring(startIndex, endIndex + 1);
    }

    try {
        return JSON.parse(jsonStr);
    } catch (parseError: any) {
        throw new Error(`Failed to parse LLM response as JSON. Response was: ${response.substring(0, 100)}...`);
    }
}

// Function to test the LLM config and send the result via email
export async function testLlmConfigAndSendEmail(
    provider: "openai" | "claude" | "google",
    apiKey: string,
    modelName: string,
    smtpUser: string,
    smtpPass: string,
    emailTo: string
) {
    const staticErrors = [
        "TypeError: Cannot read properties of undefined (reading 'map') at renderList (Components/List.tsx:42:15)",
        "MongoServerError: E11000 duplicate key error collection: test.users index: email_1 dup key: { email: \"test@example.com\" }",
        "AxiosError: Request failed with status code 401 at createError (node_modules/axios/lib/core/createError.js:16:15)",
        "ReferenceError: process is not defined at Object.<anonymous> (server.js:12:3)",
        "RangeError: Maximum call stack size exceeded at recursionFunc (utils/math.js:100:5)"
    ];

    // Pick a random error for the test or use all of them. Let's pick one.
    const selectedError = staticErrors[Math.floor(Math.random() * staticErrors.length)];

    // 1. Analyze the error using the LLM API
    const analysis = await generateErrorAnalysis(provider, apiKey, modelName, selectedError);

    // 2. Create the NodeMailer transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        pool: true,
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000,
    });

    // 3. Construct Email HTML with clean & proper format
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .banner { background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); padding: 32px 24px; text-align: center; color: white; }
        .banner h1 { margin: 0; font-size: 22px; font-weight: 700; color: #fff; }
        .banner p { margin: 8px 0 0; font-size: 14px; opacity: 0.9; color: #fff; }
        .body { padding: 28px 24px; }
        .error-tag { background: #fee2e2; color: #ef4444; padding: 12px; border-left: 4px solid #ef4444; border-radius: 4px; font-family: monospace; font-size: 13px; margin-bottom: 24px; word-break: break-all; }
        .info-row { margin-bottom: 16px; }
        .info-label { font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-value { font-size: 14px; color: #111827; margin-top: 4px; padding: 12px; background: #f3f4f6; border-radius: 6px; }
        .footer { padding: 20px 24px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f0f0f0; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="banner">
            <h1>LLM Integration Test</h1>
            <p>Your LLM API configuration is working beautifully 🚀</p>
        </div>
        <div class="body">
            <h3 style="margin-top: 0; font-size: 16px;">Tested Error Message:</h3>
            <div class="error-tag">${selectedError}</div>
            
            <div class="grid">
                <div class="info-row" style="margin-bottom: 0;">
                    <div class="info-label">Error Type</div>
                    <div class="info-value"><strong>${analysis.errorType || 'Unknown'}</strong></div>
                </div>
                <div class="info-row" style="margin-bottom: 0;">
                    <div class="info-label">Status Code</div>
                    <div class="info-value"><strong>${analysis.statusCode || 'N/A'}</strong></div>
                </div>
            </div>

            <div class="info-row">
                <div class="info-label">Location / Origin</div>
                <div class="info-value">${analysis.location}</div>
            </div>

            <div class="info-row">
                <div class="info-label">Reason</div>
                <div class="info-value">${analysis.reason}</div>
            </div>

            <div class="info-row">
                <div class="info-label">Suggested Solution</div>
                <div class="info-value" style="background: #ecfdf5; border-left: 4px solid #10b981;">${analysis.solution}</div>
            </div>
        </div>
        <div class="footer">
            Test analysis successfully generated using <strong>${provider}</strong> model <strong>${modelName}</strong>.
            <br/><br/>
            &copy; ${new Date().getFullYear()} Notaify. All rights reserved.
        </div>
    </div>
</body>
</html>
    `;

    // 4. Dispatch the test email
    await transporter.sendMail({
        from: `Notaify LLM Tester <${smtpUser}>`,
        to: emailTo,
        subject: `🤖 Notaify — LLM Integration Test Successful`,
        html: emailHtml,
    });

    return { success: true, analysis };
}
