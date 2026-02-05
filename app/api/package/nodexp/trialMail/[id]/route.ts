import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

const errorlog = prisma.errorLog;
const projects = prisma.project;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project_id = params.id;
    
    const project = projects.findFirst({
        where: {id: project_id}
    });

    
    
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Something went wrong at api/package/nodexp/trialMail/[id]' },
      { status: 500 }
    );
  }
}
