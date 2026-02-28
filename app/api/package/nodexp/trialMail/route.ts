import { NextRequest, NextResponse } from 'next/server';
import { processTrialMail } from '@/lib/controllerHelper/trialHelper';

/**
 * Handles SMTP verification requests.
 * Sends a test email using the provided credentials (or project-based config)
 * to ensure that the SMTP settings are correctly configured and working.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await processTrialMail(body);

        if (result.error) {
            return NextResponse.json(
                { message: 'error', error: result.error },
                { status: result.status }
            );
        }

        return NextResponse.json({
            message: 'success',
            data: result.data,
        }, { status: result.status || 200 });

    } catch (error: any) {
        console.error('Trial mail route error:', error);
        return NextResponse.json(
            { message: 'error', error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}