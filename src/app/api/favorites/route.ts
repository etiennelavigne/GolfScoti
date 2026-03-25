import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const favorites = await prisma.favorite.findMany({
            where: { userId }
        });

        return NextResponse.json(favorites);
    } catch (error) {
        console.error("[FAVORITES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { courseId } = body;

        if (!courseId) {
            return new NextResponse("Course ID required", { status: 400 });
        }

        const favorite = await prisma.favorite.create({
            data: {
                userId,
                courseId
            }
        });

        return NextResponse.json(favorite);
    } catch (error) {
        console.error("[FAVORITES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const searchParams = req.nextUrl.searchParams;
        const courseId = searchParams.get('courseId');

        if (!courseId) {
            return new NextResponse("Course ID required", { status: 400 });
        }

        const favorite = await prisma.favorite.delete({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        });

        return NextResponse.json(favorite);
    } catch (error) {
        // If it doesn't exist, we can just return success or skip
        console.error("[FAVORITES_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
