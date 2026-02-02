import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        console.log('API Route called - generateApiKey');

        // Generate API Key ID (random identifier)
        const timestamp = Date.now().toString().slice(-6);
        const randomPart1 = crypto.randomBytes(3).toString('hex');
        const apiKeyId = `nty_${randomPart1}_${timestamp}`;

        // Generate secret API key: nty_XXXXXXXXXXXXXX (max 18 chars)
        // nty_ (4 chars) + 14 random hex chars = 18 chars total
        const randomPart2 = crypto.randomBytes(7).toString('hex');
        const apiKey = `nty_${randomPart2}`;

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
