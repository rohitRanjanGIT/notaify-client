import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

const projects = prisma.project;
const users = prisma.errorLog;


export async function POST(request: NextRequest) {
  try {
    const { project_id } = await request.json();
    return NextResponse.json({ message: "success", data: ["id: ", project_id] });
  } catch (error) {
    return NextResponse.json({ message: "error" });
  }
}