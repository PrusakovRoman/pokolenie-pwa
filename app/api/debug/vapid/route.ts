// app/api/debug/vapid/route.ts
export async function GET() {
    return Response.json({
        // Клиентская переменная (должна быть в сборке)
        publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        publicKeyLength: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.length,

        // Серверная переменная (только на сервере)
        privateKeyExists: !!process.env.VAPID_PRIVATE_KEY,

        // Инфо о среде
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV,
    });
}