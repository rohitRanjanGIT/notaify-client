import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        console.log('API Route called - generateApiKey');
        const body = await request.json();
        console.log('Request body:', body);

        const { projectId, projectName } = body;

        if (!projectId || !projectName) {
            console.log('Missing projectId or projectName:', { projectId, projectName });
            return NextResponse.json(
                { error: 'Missing projectId or projectName' },
                { status: 400 }
            );
        }

        // Generate API Key ID (display-friendly identifier)
        const timestamp = Date.now().toString().slice(-6);
        const cleaned = projectName.replace(/[^a-z0-9]/gi, '').slice(0, 8);
        const apiKeyId = `ntf_${cleaned.toLowerCase()}_${timestamp}`;

        // Generate secret API key: ntf_XXXXXXXXXXXXXX (max 18 chars)
        // ntf_ (4 chars) + 14 random hex chars = 18 chars total
        const randomPart = crypto.randomBytes(7).toString('hex');
        const apiKey = `ntf_${randomPart}`;

        console.log('API Key ID and secret generated successfully');
        return NextResponse.json({ apiKeyId, apiKey }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to generate API key:', error);
        console.error('Error message:', errorMessage);
        return NextResponse.json(
            { error: `Failed to generate API key: ${errorMessage}` },
            { status: 500 }
        );
    }
}
