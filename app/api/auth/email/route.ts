import { getUserEmail } from "@/app/lib/actions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const email = await getUserEmail()

        return Response.json({
            email,
            exists: !!email
        })
    } catch (error) {
        return Response.json({
            email: null,
            error: 'Failed to get email'
        }, { status: 200 });
    }
}