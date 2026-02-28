import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';
import nodemailer from 'nodemailer';

/**
 * Ingest Endpoint (/api/package/nodexp/ingest)
 * 
 * This endpoint is called by the client application to ingest real errors.
 * It uses the project's saved LLM configuration to analyze the error,
 * optionally uses the SMTP config to email the results (or just raw error),
 * and finally stores the error and resolution in the `errorLog` database table.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Expect the client to provide their Notaify API credentials and the error data
        const { apiKeyId, apiKey, error: errorMsg, location, stack } = body;

        if (!apiKeyId || !apiKey) {
            return NextResponse.json(
                { message: 'error', error: 'Missing Notaify API credentials (apiKeyId, apiKey)' },
                { status: 401 }
            );
        }

        if (!errorMsg) {
            return NextResponse.json(
                { message: 'error', error: 'Missing error message to analyze' },
                { status: 400 }
            );
        }

        // 1. Authenticate & fetch the project configurations
        const currentProject = await prisma.project.findFirst({
            where: {
                notaifyApiKeyId: apiKeyId,
                notaifyApiKey: apiKey,
            },
        });

        if (!currentProject) {
            return NextResponse.json(
                { message: 'error', error: 'Project not found or invalid credentials' },
                { status: 404 }
            );
        }

        // We require LLM credentials to perform the analysis
        if (!currentProject.llmType || !currentProject.llmApiKey || !currentProject.llmApiModel) {
            return NextResponse.json(
                { message: 'error', error: 'Project is missing LLM configuration. Cannot analyze error.' },
                { status: 400 }
            );
        }

        const provider = currentProject.llmType;
        const llmApiKey = currentProject.llmApiKey;
        const modelName = currentProject.llmApiModel;

        // Ensure we capture as much context as possible for the LLM
        const fullErrorContext = `${errorMsg}\nLocation: ${location || 'Unknown'}\nStack: ${stack || 'No Stack'}`;

        // 2. Perform the LLM Analysis
        const { generateErrorAnalysis } = await import('@/lib/controllerHelper/LLMgenerator');

        let analysis;
        try {
            analysis = await generateErrorAnalysis(provider, llmApiKey, modelName, fullErrorContext);
        } catch (llmError: any) {
            console.error('LLM Analysis failed during ingestion:', llmError);

            // Fallback: If LLM fails, we still want to log the raw error.
            analysis = {
                location: location || 'Unknown',
                reason: 'LLM Analysis failed or timed out: ' + (llmError.message || 'Unknown error'),
                solution: 'Please review the raw error log.',
                errorType: 'LLM_FAILURE',
                statusCode: 'N/A'
            };
        }

        // 3. Save the Error and its Analysis into the Database
        const newLog = await prisma.errorLog.create({
            data: {
                projectId: currentProject.id,
                error: fullErrorContext.substring(0, 1000), // Prevent overly long strings
                LLmType: provider,
                llmApiModel: modelName,
                resolution: JSON.stringify(analysis),
                isTrial: false, // This is a real ingested error
            },
        });

        // 4. (Optional) Send an Email Notification
        // Since LLM Analysis was performed, we can send a formatted email if SMTP is configured.
        if (currentProject.smtpUser && currentProject.smtpPass && currentProject.emailTo) {
            try {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: currentProject.smtpUser,
                        pass: currentProject.smtpPass,
                    },
                    connectionTimeout: 5000,
                    greetingTimeout: 5000,
                    socketTimeout: 5000,
                });

                const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .banner { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 32px 24px; text-align: center; color: white; }
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
            <h1>New Application Error Detected</h1>
            <p>Project: ${currentProject.projectName}</p>
        </div>
        <div class="body">
            <h3 style="margin-top: 0; font-size: 16px;">Raw Error:</h3>
            <div class="error-tag">${errorMsg}</div>
            
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
            
            <div class="info-row">
                <div class="info-label">Stack Trace</div>
                <div class="info-value" style="white-space: pre-wrap; font-family: monospace; font-size: 11px;">${stack || 'N/A'}</div>
            </div>
        </div>
        <div class="footer">
            Analysis successfully generated using <strong>${provider}</strong> model <strong>${modelName}</strong>.<br/>
            Log ID: ${newLog.id}
            <br/><br/>
            &copy; ${new Date().getFullYear()} Notaify. All rights reserved.
        </div>
    </div>
</body>
</html>
                `;

                await transporter.sendMail({
                    from: `Notaify Alerts <${currentProject.smtpUser}>`,
                    to: currentProject.emailTo,
                    subject: `🚨 Notaify Alert: Error in ${currentProject.projectName}`,
                    html: emailHtml,
                });
            } catch (mailError) {
                console.error("Ingest Route: Failed to send alert email", mailError);
                // We don't fail the request if the email fails, we still return the log ID.
            }
        }

        return NextResponse.json({
            message: 'success',
            data: 'Error successfully ingested and analyzed.',
            logId: newLog.id,
            analysis: analysis
        }, { status: 201 });

    } catch (error: any) {
        console.error('Ingest route error:', error);
        return NextResponse.json(
            { message: 'error', error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
