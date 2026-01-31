import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const userRole = auth?.user?.role;

            const protectedPaths = ['/dashboard', '/material', '/mentor', '/modifyMaterial', '/api']
            const adminPaths = ['/modifyMaterial']
            const isProtected = protectedPaths.some(path => nextUrl.pathname.startsWith(path))
            const isAdminPath = adminPaths.some(path => nextUrl.pathname.startsWith(path))

            if (isProtected && !isLoggedIn) return false

            if (isLoggedIn && isAdminPath && userRole !== 'Администратор') {
                const callbackUrl = nextUrl.pathname;
                const redirectUrl = new URL('/dashboard/materials', nextUrl.origin);
                redirectUrl.searchParams.set('error', 'unauthorized');
                redirectUrl.searchParams.set('from', callbackUrl);

                return Response.redirect(redirectUrl);
            }

            return true
        },
    },
    providers: []
} satisfies NextAuthConfig