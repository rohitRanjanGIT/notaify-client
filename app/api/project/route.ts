import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

// GET - Fetch all projects for a user
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required' },
                { status: 400 }
            );
        }

        const projects = await prisma.project.findMany({
            where: { user_id: userId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to fetch projects:', error);
        return NextResponse.json(
            { error: `Failed to fetch projects: ${errorMessage}` },
            { status: 500 }
        );
    }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            user_id,
            name,
            description,
            projectName,
            llmType,
            llmApiKey,
            llmApiModel,
            smtpUser,
            smtpPass,
            emailFrom,
            emailTo,
            notaifyApiKey,
            notaifyApiKeyId,
        } = body;

        if (!user_id || !name || !projectName) {
            return NextResponse.json(
                { error: 'user_id, name, and projectName are required' },
                { status: 400 }
            );
        }

        const project = await prisma.project.create({
            data: {
                user_id,
                name,
                description: description || '',
                projectName,
                llmType: llmType || null,
                llmApiKey: llmApiKey || null,
                llmApiModel: llmApiModel || null,
                smtpUser: smtpUser || null,
                smtpPass: smtpPass || null,
                emailFrom: emailFrom || null,
                emailTo: emailTo || null,
                notaifyApiKey: notaifyApiKey || null,
                notaifyApiKeyId: notaifyApiKeyId || null,
            },
        });

        return NextResponse.json({ project }, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to create project:', error);
        return NextResponse.json(
            { error: `Failed to create project: ${errorMessage}` },
            { status: 500 }
        );
    }
}

// PUT - Update an existing project
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            id,
            name,
            description,
            projectName,
            llmType,
            llmApiKey,
            llmApiModel,
            smtpUser,
            smtpPass,
            emailFrom,
            emailTo,
            notaifyApiKey,
            notaifyApiKeyId,
        } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Project id is required' },
                { status: 400 }
            );
        }

        const project = await prisma.project.update({
            where: { id },
            data: {
                name,
                description,
                projectName,
                llmType: llmType || null,
                llmApiKey: llmApiKey || null,
                llmApiModel: llmApiModel || null,
                smtpUser: smtpUser || null,
                smtpPass: smtpPass || null,
                emailFrom: emailFrom || null,
                emailTo: emailTo || null,
                notaifyApiKey: notaifyApiKey || null,
                notaifyApiKeyId: notaifyApiKeyId || null,
            },
        });

        return NextResponse.json({ project }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to update project:', error);
        return NextResponse.json(
            { error: `Failed to update project: ${errorMessage}` },
            { status: 500 }
        );
    }
}

// DELETE - Delete a project
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Project id is required' },
                { status: 400 }
            );
        }

        await prisma.project.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to delete project:', error);
        return NextResponse.json(
            { error: `Failed to delete project: ${errorMessage}` },
            { status: 500 }
        );
    }
}
