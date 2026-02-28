import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';
import { decryptProjectSecrets } from '@/lib/utils/encryption';

// GET - Fetch a single project by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams?.id;

        if (!id) {
            return NextResponse.json(
                { error: 'Project id is required' },
                { status: 400 }
            );
        }

        const project = await prisma.project.findUnique({
            where: { id },
        });

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        // Decrypt sensitive fields before sending to the client
        const decryptedProject = decryptProjectSecrets(project as unknown as Record<string, unknown>);

        return NextResponse.json({ project: decryptedProject }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to fetch project:', error);
        return NextResponse.json(
            { error: `Failed to fetch project: ${errorMessage}` },
            { status: 500 }
        );
    }
}
