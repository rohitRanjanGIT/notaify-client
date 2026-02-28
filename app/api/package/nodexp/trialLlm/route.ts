import { NextRequest, NextResponse } from 'next/server';
import { processTrialLlm } from '@/lib/controllerHelper/trialHelper';

/**
 * Handles LLM verification requests.
 * Analyzes a sample error using the provided LLM credentials and emails the result
 * to the specified address to verify both LLM and SMTP configurations.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await processTrialLlm(body);

        if (result.error) {
            return NextResponse.json(
                { message: 'error', error: result.error },
                { status: result.status }
            );
        }

        return NextResponse.json({
            message: 'success',
            data: result.data,
            analysis: result.analysis
        }, { status: result.status || 200 });

    } catch (error: any) {
        console.error('Trial LLM route error:', error);
        return NextResponse.json(
            { message: 'error', error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
