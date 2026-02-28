import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');

        if (!projectId) {
            return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
        }

        // Verify that the user owns the project
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                user_id: userId,
            },
        });

        if (!project) {
            return NextResponse.json({ error: 'Project not found or unauthorized' }, { status: 404 });
        }

        const logs = await prisma.errorLog.findMany({
            where: { projectId: projectId },
            orderBy: { timestamp: 'desc' },
        });

        return NextResponse.json({ logs, project }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to fetch error logs:', error);
        return NextResponse.json(
            { error: `Failed to fetch error logs: ${errorMessage}` },
            { status: 500 }
        );
    }
}
