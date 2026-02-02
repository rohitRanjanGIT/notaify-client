import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

// GET - Fetch a single project by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams?.id;

        console.log('API Route called with params:', resolvedParams);
        console.log('Project ID:', id);

        if (!id) {
            console.log('No ID provided');
            return NextResponse.json(
                { error: 'Project id is required' },
                { status: 400 }
            );
        }

        console.log('Querying database for project:', id);

        const project = await prisma.project.findUnique({
            where: { id },
        });

        console.log('Database result:', project ? 'Project found' : 'Project not found');

        if (!project) {
            console.log('Project not found in database');
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        console.log('Returning project successfully');
        return NextResponse.json({ project }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to fetch project - Error:', errorMessage);
        console.error('Full error:', error);
        return NextResponse.json(
            { error: `Failed to fetch project: ${errorMessage}` },
            { status: 500 }
        );
    }
}
