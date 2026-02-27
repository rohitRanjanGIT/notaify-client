import { NextRequest, NextResponse } from 'next/server';
import { testLlmConfigAndSendEmail } from '@/lib/controllerHelper/LLMgenerator';
import { prisma } from '@/lib/prisma/prisma';

/**
 * Handles LLM verification requests.
 * Analyzes a sample error using the provided LLM credentials and emails the result
 * to the specified address to verify both LLM and SMTP configurations.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        let provider = body.provider;
        let apiKey = body.apiKey;
        let modelName = body.modelName;
        let smtpUser = body.smtpUser;
        let smtpPass = body.smtpPass;
        let emailTo = body.emailTo;

        // Support fetching config from DB via project_id
        if (body.project_id) {
            const currentProject = await prisma.project.findUnique({
                where: { id: body.project_id },
            });

            if (!currentProject) {
                return NextResponse.json({ message: 'error', error: 'Project not found' }, { status: 404 });
            }

            if (!currentProject.llmType || !currentProject.llmApiKey || !currentProject.llmApiModel) {
                return NextResponse.json(
                    { message: 'error', error: 'Project is missing LLM configuration.' },
                    { status: 400 }
                );
            }

            if (!currentProject.smtpUser || !currentProject.smtpPass || !currentProject.emailTo) {
                return NextResponse.json(
                    { message: 'error', error: 'Project is missing SMTP configuration. We need SMTP to email you the analysis.' },
                    { status: 400 }
                );
            }

            provider = currentProject.llmType;
            apiKey = currentProject.llmApiKey;
            modelName = currentProject.llmApiModel;
            smtpUser = currentProject.smtpUser;
            smtpPass = currentProject.smtpPass;
            emailTo = currentProject.emailTo;
        } else if (!provider || !apiKey || !modelName || !smtpUser || !smtpPass || !emailTo) {
            return NextResponse.json(
                { message: 'error', error: 'Missing required fields. Please fill in both LLM and SMTP credentials to test.' },
                { status: 400 }
            );
        }

        const result = await testLlmConfigAndSendEmail(
            provider,
            apiKey,
            modelName,
            smtpUser,
            smtpPass,
            emailTo
        );

        return NextResponse.json({
            message: 'success',
            data: `LLM verification successful! The resolved analysis has been emailed to ${emailTo}.`,
            analysis: result.analysis
        });
    } catch (error: any) {
        console.error('Trial LLM error:', error);

        let errorMsg = 'Failed to analyze error using the LLM API.';
        if (error.message) {
            errorMsg = error.message;
        }

        return NextResponse.json(
            { message: 'error', error: errorMsg },
            { status: 500 }
        );
    }
}
