import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/dashboard',
        error: '/auth/error'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user

            const protectedPaths = ['/dashboard', '/materials']
            const isProtected = protectedPaths.some(path => nextUrl.pathname.startsWith(path))

            if (isProtected && !isLoggedIn) return false

            return true
        },
    },
    providers: []
} satisfies NextAuthConfig