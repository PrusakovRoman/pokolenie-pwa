import { requireAuth } from "@/app/lib/actions";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

const redis = Redis.fromEnv();

export async function DELETE(request: NextRequest) {
    try {
        const user = await requireAuth();

        await redis.del(`subscription:${user.email}`);

        return Response.json({
            success: true,
            message: 'Subscription removed',
            user: {
                email: user.email,
            }
        });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.error('Delete error:', error);
        return Response.json({
            error: 'Failed to remove subscription',
            details: error.message || 'Unknown error'
        }, { status: 500 });
    }
}