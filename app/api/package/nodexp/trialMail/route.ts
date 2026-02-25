import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

const projects = prisma.project;
const users = prisma.errorLog;


export async function POST(request: NextRequest) {
    try {
        const { project_id } = await request.json();
        const currentProject = await projects.findUnique({
            where: {
                id: project_id
            }
        })
        if (!currentProject) {
            return NextResponse.json({ message: "error", data: ["Project not found"] });
        }
        return NextResponse.json({ message: "success", data: [currentProject.name, currentProject.id, currentProject.emailTo, currentProject.smtpUser, currentProject.smtpPass] });
    } catch (error) {
        return NextResponse.json({ message: "error" });
    }
}