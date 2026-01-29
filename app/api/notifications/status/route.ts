import { requireAuth } from "@/app/lib/actions";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

const redis = Redis.fromEnv();

export async function GET(request: NextRequest) {
    try {
        const user = await requireAuth();

        const subscription = await redis.hgetall(`subscription:${user.email}`);

        const hasEndpoint = subscription &&
            typeof subscription === 'object' &&
            'endpoint' in subscription;

        return Response.json({
            enabled: !!hasEndpoint,
            subscription: subscription || null,
            user: {
                email: user.email,
            }
        });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.error('Status error:', error);
        return Response.json({
            error: 'Failed to get status',
            details: error.message || 'Unknown error'
        }, { status: 500 });
    }
}