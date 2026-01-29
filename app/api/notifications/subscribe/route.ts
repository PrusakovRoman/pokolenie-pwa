import { requireAuth } from "@/app/lib/actions";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

const redis = Redis.fromEnv();

export async function POST(request: NextRequest) {
    try {
        const user = await requireAuth();
        const { subscription } = await request.json();

        if (!subscription?.endpoint || !subscription?.keys) {
            return Response.json({ error: 'Invalid subscription data' }, { status: 400 });
        }

        await redis.hset(`subscription:${user.email}`, {
            ...subscription,
            email: user.email,
            role: user.role,
            enabled: true,
            createdAt: new Date().toISOString()
        });

        return Response.json({
            success: true,
            user: {
                email: user.email,
                name: user.name
            }
        });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.error('Subscription error:', error);
        return Response.json({
            error: 'Failed to save subscription',
            details: error.message || 'Unknown error'
        }, { status: 500 });
    }
}